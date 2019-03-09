import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import './style/index.less';

class View extends React.Component {
  state = {
    loaded: false,
  }

  componentWillMount() {
    const img = this.img = new Image();
    img.onload = () => {
      this.setState({
        loaded: true,
      });
    };
    img.onerror = () => { message.error('图片加载失败，请重试'); this.img = null; this.props.onCancel(); };
    img.src = this.props.url;
  }

  getTranslateStyle(translateX, translateY) {
    const translateValue = `translate(${translateX}px,${translateY}px) translateZ(0)`;
    return {
      transform: translateValue,
      WebkitTransform: translateValue,
    };
  }

  // 决定遮罩位置信息
  areaClientRect() { // 只有另一个边小于的时候居中才会出现
    const { fillType, crop, style, center } = this.props;
    const width = crop && crop.width ? crop.width : this.img.naturalWidth;
    const height = crop && crop.height ? crop.height : this.img.naturalHeight;
    const rate = width / height;
    const styleW = parseInt(style.width, 10);
    const styleH = parseInt(style.height, 10);
    let type = fillType;
    if (fillType === 'auto') {
      type = width > height ? 'width' : 'height';
    }
    if (fillType === 'short') {
      type = width < height ? 'width' : 'height';
    }
    const cropWidth = type === 'width' ? styleW : styleH * rate;
    const cropHeight = type === 'height' ? styleH : styleW / rate;
    const cropRate = type === 'width' ? width / styleW : height / styleH; // 真实与缩放比
    const outerValue = type === 'height' ? (cropWidth - style.width) / 2 : (cropHeight - style.height) / 2;
    return { type, width: cropWidth, height: cropHeight, rate: cropRate, cropX: center && type !== 'width' ? (cropWidth - styleW) / 2 : 0, cropY: center && type !== 'height' ? (cropHeight - styleH) / 2 : 0, outerValue: outerValue > 0 ? outerValue : 0 };
  }

  // 决定图片位置信息
  imgPosition(rate) {
    const { naturalWidth, naturalHeight } = this.img;
    const { crop } = this.props;
    const X = crop && crop.X ? crop.X : 0;
    const Y = crop && crop.Y ? crop.Y : 0;
    const realWidth = naturalWidth / rate;
    const realHeight = naturalHeight / rate;
    const realX = X / rate;
    const realY = Y / rate;
    return { x: realX, y: realY, width: realWidth, height: realHeight };
  }

  render() {
    const { loaded } = this.state;
    const { className = '', style = {}, picStyle = {} } = this.props;
    if (!loaded) {
      return (<div style={{ textAlign: 'center', lineHeight: `${parseInt(style.height, 10)}px`, ...style }}>loading...</div>);
    }
    const { width: cropWidth, height: cropHeight, rate: cropRate, cropY, cropX, outerValue, type } = this.areaClientRect();
    const { x, y, width, height } = this.imgPosition(cropRate);

    return (<div style={{ ...style }} className={className}>
      <div className="hermes-crop-preview">
        <div className="hermes-crop-preview-district" style={{ width: cropWidth, height: cropHeight, ...this.getTranslateStyle(-cropX, -cropY) }}>
          <div style={{ ...picStyle, display: 'inline-block', overflow: 'hidden', width: cropWidth > style.width ? style.width : cropWidth, height: cropHeight > style.height ? style.height : cropHeight, ...this.getTranslateStyle(type === 'width' ? 0 : outerValue, type === 'height' ? 0 : outerValue) }}>
            <img alt="" src={this.props.url} className="hermes-crop-preview-pic" style={{ height, width, ...this.getTranslateStyle(type === 'width' ? -x : -x - outerValue, type === 'height' ? -y : -y - outerValue) }} />
          </div>
        </div>
      </div>
    </div>);
  }
}

View.propTypes = {
  url: PropTypes.string.isRequired,
  crop: PropTypes.object,
  style: PropTypes.object.isRequired, // 必须要填写长宽，其他自定义
  picStyle: PropTypes.object,
  fillType: PropTypes.oneOf(['height', 'width', 'auto', 'short']), // auto 取最长边填满
  center: PropTypes.bool, // 一边占满，另一边是非居中
};

View.defaultProps = {
  center: true,
  fillType: 'auto',
};

export default View;
