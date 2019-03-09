import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import Cropper from './Cropper';
import ImageView from './View';
import './style/index';

const noop = () => {};

class ImgCropModal extends Component {
  static propTypes = {
    url: PropTypes.string,
    onChange: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    minH: PropTypes.number,
    minW: PropTypes.number,
    maxW: PropTypes.number,
    maxH: PropTypes.number,
    minPicW: PropTypes.number,
    minPicH: PropTypes.number,
    maxPicW: PropTypes.number,
    maxPicH: PropTypes.number,
    visible: PropTypes.bool,
    isModal: PropTypes.bool,
    style: PropTypes.object,
    initWidth: PropTypes.number,
    initHeight: PropTypes.number,
    rate: PropTypes.number,
    dragMin: PropTypes.object,
    dragMax: PropTypes.object,
    over: PropTypes.bool,
    modalOption: PropTypes.object,
    type: PropTypes.oneOf(['position', 'base64']),
  }

  static defaultProps = {
    minH: 360,
    minW: 720,
    maxH: 600,
    maxW: 1242,
    maxPicW: 0, // 真正的最小值
    maxPicH: 0,
    minPicW: 133,
    minPicH: 0,
    type: 'position',
    PropTypes: {},
    visible: true,
    isModal: true,
    onChange: noop,
    style: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    const img = this.img = new Image();
    img.onload = this.loadImg;
    img.onerror = () => { message.error('图片加载失败，请重试'); this.img = null; this.props.onCancel(); };
    img.src = this.props.url;
  }

  onChange = (cropInfo) => {
    this.cropInfo = cropInfo;
    const rate = this.img.naturalWidth / this.img.width;
    this.props.onChange(cropInfo, rate);
  }

  onOk = () => {
    const { width, height, naturalWidth, naturalHeight } = this.img;
    const { onOk, modalOption = {} } = this.props;
    const okCallback = modalOption.onOk || onOk || noop;
    okCallback({ ...this.cropInfo, orgWidth: Math.floor((naturalWidth || width)), orgHeight: Math.floor((naturalHeight || height)), url: this.props.url });
  }

  loadImg = () => {
    this.setState({ loaded: true });
  }

  // 截图区域计算规则,根本不可能出现1242的宽，因为浮层限制。。。
  // 1.如果图片双边均大于等于1242 ＊ 600 截图区域1242 ＊ 600，且可缩放至750 (由于宽高比要保持为1242).
  // 2.如果图片双边均小于1242以 750 ＊ 360来裁剪.
  // 3.均可放大到占满图片一边.
  calFrameWH = (picW, picH, standardW, standardH) => {
    const rate = picW / picH;

    let frameWidth = picW;
    let frameHeight = picH;

    if (rate < standardW / standardH) {
      // 以长度为准
      if (frameWidth > standardW) {
        frameWidth = standardW;
        frameHeight = standardH;
      } else {
        frameHeight = (frameWidth / standardW) * standardH;
      }
    }

    if (rate >= standardW / standardH) {
      // 以高度为准
      if (frameHeight > standardH) {
        frameWidth = standardW;
        frameHeight = standardH;
      } else {
        frameWidth = (frameHeight / standardH) * standardW;
      }
    }

    return { frameWidth: Math.floor(frameWidth), frameHeight: Math.floor(frameHeight) };
  }

  transferPosition = ({ X, Y, width, height }, PicW) => {
    const rate = this.img.naturalWidth / PicW;
    if (!isNaN(X) && !isNaN(Y) && width && height) {
      return { originX: X / rate, originY: Y / rate, frameWidth: width / rate, frameHeight: height / rate };
    }
    throw Error('初始化信息不全');
  }
  // 截图区域处理规则
  // 1.截图区域宽高大于图片宽高需做缩放。
  // 2.且截图区域只能放大，不能缩小
  calMinBound = (PicW, PicH) => {
    const { maxH, maxW, minW, minH, initWidth, initHeight, rate, init } = this.props;
    if (init) {
      return this.transferPosition(init, PicW);
    }
    if (initWidth || initHeight) {
      // 仅有initHeight和initWidth且为百分比
      if (initWidth && initHeight && !rate && (initHeight < 1 || initWidth < 1)) {
        throw new Error('仅有initHeight和initWidth时不能用百分比');
      }
      // 仅有initHeight和initWidth
      if (initWidth && initHeight && !rate) {
        if (initHeight > PicH || initWidth > PicW) {
          const initRate = initWidth / initHeight;
          const imgRate = PicW / PicH;
          if (initRate > imgRate) {
            return { frameHeight: PicW / initRate, frameWidth: PicW };
          }
          return { frameHeight: PicH, frameWidth: PicH * initRate };
        }
        return { frameHeight: initHeight, frameWidth: initWidth };
      }
      const initRate = rate || (PicW / PicH);
      // 仅有initWidth及rate
      if (initWidth) {
        let frameWidth = initWidth < 1 ? PicW * initWidth : initWidth;
        let frameHeight = frameWidth / initRate;
        if (PicH < frameHeight) {
          frameHeight = PicH;
          frameWidth = PicH * initRate;
        }
        return { frameHeight: Math.floor(frameHeight), frameWidth: Math.floor(frameWidth) };
      }
      // 仅有initHeight及rate
      if (initHeight) {
        let frameHeight = initHeight < 1 ? PicH * initHeight : initHeight;
        let frameWidth = frameHeight * initRate;
        if (PicW < frameWidth) {
          frameWidth = PicW;
          frameHeight = frameWidth / initRate;
        }
        return { frameHeight: Math.floor(frameHeight), frameWidth: Math.floor(frameWidth) };
      }
    }

    // 交互要求框大小, 老功能不推荐
    if (PicW > maxW && PicH > maxH) {
      const { frameWidth, frameHeight } = this.calFrameWH(PicW, PicH, maxW, maxH);
      return { frameHeight: Math.floor(frameHeight), frameWidth: Math.floor(frameWidth) };
    }

    const { frameWidth, frameHeight } = this.calFrameWH(PicW, PicH, minW, minH);
    return { frameHeight: Math.floor(frameHeight), frameWidth: Math.floor(frameWidth) };
  }

  /* eslint-disable */
  calPicMinAndMax = (width, height, rate) => {
    const { maxH, maxW, minW, minH, minPicW = 0, minPicH = 0, maxPicW = 0, maxPicH = 0 } = this.props;
    const { clientHeight } = document.documentElement;
    // 小于给定值强拉到更定值
    let actureMaxW = maxPicW || maxPicH ? (maxPicW ? maxPicW : maxPicH * rate) : maxW;
    let actureMaxH = maxPicH || maxPicW ? (maxPicH ? maxPicH : maxPicW / rate) : maxH;
    let actureMinW = minPicW || minPicH ? (minPicW ? minPicW : minPicH * rate) : minW;
    let actureMinH = minPicH || minPicW ? (minPicH ? minPicH : minPicW / rate) : minH;
    actureMinW = actureMinW < 133 ? 133 : actureMinW;
    actureMaxW = actureMaxW < 133 ? 133 : actureMaxW;
    actureMaxH = actureMaxH > (clientHeight - 104) ? clientHeight - 104 : actureMaxH;

    if (actureMinH && (actureMinW / rate) > actureMinH) {
      actureMinW = actureMinH * rate;
    } else if (actureMinW) {
      actureMinH = actureMinW / rate;
    }
    if (actureMaxH && (actureMaxW / rate) > actureMaxH) {
      actureMaxW = actureMaxH * rate;
    } else if (actureMaxW) {
      actureMaxH = actureMaxW / rate;
    }
    return { actureMinH, actureMinW, actureMaxH, actureMaxW };
  }

  // 限定宽高情况下，重新计算图片宽高
  // 截图图片处理规则
  // 1.高度需小于界面高度，宽度小于给定的边界宽度
  // 2.宽高小于给定值需要强拉到大的边在给定值
  /* eslint-disable */
  calPicWH = () => {
    let { width: boundW, height: boundH } = this.props.style;
    const { width, height } = this.img;
    const rate = width / height;
    let PicW, PicH;

    if (!boundW && !boundH) {
      const {actureMinH, actureMinW, actureMaxH, actureMaxW} = this.calPicMinAndMax(width, height, rate);
      // 小于给定值强拉到更定值
      PicW = width < actureMinW ? actureMinW : width;
      PicH = height < actureMinH ? actureMinH : height;
      // 限制图片宽高
      PicW = actureMaxW < PicW ? actureMaxW : PicW;
      PicH = actureMaxH < PicH ? actureMaxH : PicH;
    } else {
      let boundHeight = parseInt(boundH);
      let boundWidth = parseInt(boundW);
      if (boundH && boundW) {
        const boundRate = boundWidth / boundHeight;
        if (boundRate > rate) {
          PicW = boundHeight * rate;
          PicH = boundHeight;
        } else {
          PicW = boundWidth;
          PicH = boundWidth / rate;
        }
      } else {
        PicH = !boundH ? boundWidth / rate : boundHeight;
        PicW = !boundW ? boundHeight * rate : boundWidth;
      }
    }

    if (PicH !== height || PicW !== width) {
      if (rate < 1) {
        PicH = PicW / rate;
      } else {
        PicW = PicH * rate;
      }
    }

    return { PicW: Math.floor(PicW), PicH: Math.floor(PicH) };
  }

  getDrageLimit = (width, height) => {
    const {dragMin, dragMax} = this.props;
    let limitInfo = {} // max需小于min
    if (dragMax) {
      const originValue = dragMax.type === 'height' ? height : width;
      limitInfo['max'] = {...dragMax, value: dragMax.value < 1 ? dragMax.value * originValue: dragMax.value };
    }
    if (dragMin) {
      const originValue = dragMin.type === 'height' ? height : width;
      limitInfo['min'] = {...dragMin, value: dragMin.value < 1 ? dragMin.value * originValue: dragMin.value };
    }
    if (dragMax && dragMin && dragMax.type === dragMin.type && limitInfo.min.value > limitInfo.max.value) {
      throw new Error('可拖拽最小值大于最大值');
    }
    return limitInfo;
  }

  render() {
    const { loaded } = this.state;
    const { minW, minH, url, type, isModal, style, over, modalOption = {}, onCancel } = this.props;
    const cancelCallback = modalOption.onCancel || onCancel || noop;
    if (!loaded) {
      return <div />;
    }

    const { PicW, PicH } = this.calPicWH();
    const { frameHeight, frameWidth, originX = 0, originY = 0} = this.calMinBound(PicW, PicH);
    const topV = Math.floor(document.documentElement.clientHeight - PicH - 104) / 2;
    const dragLimit = this.getDrageLimit(PicW, PicH);
    const CropDom = <Cropper {...dragLimit} over={over} style={style} type={type} originX={originX} originY={originY} src={url} onChange={this.onChange} minWidth={frameWidth < minW ? frameWidth : minW} minHeight={frameHeight < minH ? frameHeight : minH} frameHeight={frameHeight} frameWidth={frameWidth} imgHeight={Math.floor(PicH)} imgWidth={PicW} rate={frameWidth / frameHeight} />

    return (
      <div>
        {isModal ? <Modal {...modalOption} maskClosable={false} visible={this.props.visible} width={PicW + 32} onOk={this.onOk} style={{ top: `${topV}px` }} onCancel={cancelCallback} >
           <div style={{...style, marginTop: 20}}>
              {CropDom}
           </div>
        </Modal> : <div style={{...style}}>
            {CropDom}
        </div>}
      </div>
    );
  }
}

ImgCropModal.Preview = ImageView;
export default ImgCropModal;
