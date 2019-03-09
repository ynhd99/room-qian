import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isIE = window.navigator.userAgent.toLowerCase().indexOf('msie') > 0;
class Cropper extends Component {
  static propTypes = {
    imgHeight: PropTypes.number,
    imgWidth: PropTypes.number,
    frameWidth: PropTypes.number,
    frameHeight: PropTypes.number,
    onChange: PropTypes.func,
    src: PropTypes.string.isRequired,
    originX: PropTypes.number,
    originY: PropTypes.number,
    rate: PropTypes.number,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    max: PropTypes.object,
    min: PropTypes.object,
    type: PropTypes.oneOf(['position', 'base64']),
  }

  static defaultProps = {
    width: 200,
    over: false,
    rate: 1,
    originX: 0,
    originY: 0,
    style: {},
  }

  constructor(props) {
    super(props);
    const originX = props.originX;
    const originY = props.originY;
    // const width = tempProps.width;
    // const rate = tempProps.rate;
    const frameWidth = props.frameWidth;
    const frameHeight = props.frameHeight;
    this.state = {
      img_width: '100%',
      img_height: '',
      originX,
      originY,
      startX: 0,
      startY: 0,
      frameWidth,
      frameHeight,
      dragging: false,
      maxLeft: 0,
      maxTop: 0,
      action: null,
      imgLoaded: false,
    };
  }

  initStyles = () => {
    const tempThis = this;
    const { imgHeight, imgWidth } = this.props;

    // calc frame width height
    const tempProps2 = tempThis.props;
    let originX = tempProps2.originX;
    let originY = tempProps2.originY;
    const disabled = tempProps2.disabled;

    if (disabled) return;
    const tempState = tempThis.state;
    const frameWidth = tempState.frameWidth;
    const frameHeight = tempState.frameHeight;

    const maxLeft = imgWidth - frameWidth;
    const maxTop = imgHeight - frameHeight;

    if (originX + frameWidth >= imgWidth) {
      originX = imgWidth - frameWidth;
      tempThis.setState({
        originX,
      });
    }
    if (originY + frameHeight >= imgHeight) {
      originY = imgHeight - frameHeight;
      tempThis.setState({
        originY,
      });
    }

    tempThis.setState({
      maxLeft,
      maxTop,
      imgLoaded: true,
    });

    tempThis.calcPosition(frameWidth, frameHeight, originX, originY);
  }
  /* eslint-disable */
  calcPosition = (argWidth, argHeight, argLeft, argTop, isMove) => {
    const { img_width: imgWidth, img_height: imgHeight } = this.state;
    const { minWidth, minHeight, rate, over, min, max, style, onChange = () => {} } = this.props;
    const { width: boundWidth = imgWidth, height: boundHeight = imgHeight } = style;
    const frameNode = this.frameNode;
    const cloneImg = this.cloneImg;
    let width = argWidth;
    let height = argHeight;
    let left = argLeft;
    let top = argTop;
    const topLimit = (boundHeight - imgHeight) / -2;
    const leftLimit = (boundWidth - imgWidth) / -2;

    if (!over) {
      if (!min && !max && !isMove) {
        if (width < minWidth || height < minHeight) return false;
        if (width < 0 || height < 0) return false;
      }
    }

    if (width / boundWidth > height / boundHeight) {
      if (width > boundWidth) {
        width = boundWidth;
        left = leftLimit;
        height = width / rate;
      }
    } else if (height > boundHeight) {
      height = boundHeight;
      top = topLimit;
      width = height * rate;
    }

    if (width - leftLimit + left > boundWidth) left = boundWidth - width + leftLimit;
    if (height - topLimit + top > boundHeight) top = boundHeight - height + topLimit;
    if (left < leftLimit) left = leftLimit;
    if (top < topLimit) top = topLimit;

    // 对应dragmin，dragmax
    // width = max.type === 'width' && max.value

    frameNode.setAttribute('style', `display:block;left:${left}px;top:${top}px;width:${width}px;height:${height}px`);
    cloneImg.setAttribute('style', `transform: translate(${-left}px, ${-top}px)`);
    onChange(this.getCropInfo(left, top, width, height));
  }

  imgOnload = () => {
    const { imgHeight, imgWidth } = this.props;
    this.setState({
      img_height: imgHeight,
      img_width: imgWidth,
    }, () => {
      return this.initStyles();
    });
  }

  createNewFrame = (e) => {
    if (this.state.dragging) {
      const pageX = isIE ? e.clientX : e.pageX;
      const pageY = isIE ? e.clientY : e.pageY;
      const rate = this.props.rate;
      const tempState3 = this.state;
      const frameWidth = tempState3.frameWidth;
      const startX = tempState3.startX;
      const startY = tempState3.startY;
      const offsetLeft = tempState3.offsetLeft;
      const offsetTop = tempState3.offsetTop;


      const tempX = pageX - startX;
      const tempY = pageY - startY;

      if (tempX > 0) {
        if (tempY < 0) return this.calcPosition(frameWidth + tempX, (frameWidth + tempX) / rate, offsetLeft, offsetTop - (tempX / rate));
        return this.calcPosition(frameWidth + tempX, (frameWidth + tempX) / rate, offsetLeft, offsetTop);
      }
      if (tempY > 0) return this.calcPosition(frameWidth - tempX, (frameWidth - tempX) / rate, offsetLeft + tempX, offsetTop);
      return this.calcPosition(frameWidth - tempX, (frameWidth - tempX) / rate, offsetLeft + tempX, offsetTop + (tempX / rate));
    }
  }

  handleDrag = (e) => {
    if (this.state.dragging) {
      const action = this.state.action;

      if (!action) return this.createNewFrame(e);
      if (action === 'move') return this.frameMove(e);
      this.frameDotMove(action, e);
    }
  }

  frameMove = (e) => {
    const { originX, originY, startX, startY, frameWidth, frameHeight, maxLeft, maxTop } = this.state;
    const pageX = isIE ? e.clientX : e.pageX;
    const pageY = isIE ? e.clientY : e.pageY;
    let tempX = (pageX - startX) + originX;
    let tempY = (pageY - startY) + originY;
    if (!this.props.over) {
      if (pageX < 0 || pageY < 0) return false;
      if (tempX > maxLeft) tempX = maxLeft;
      if (tempY > maxTop) tempY = maxTop;
    }
    this.calcPosition(frameWidth, frameHeight, tempX, tempY, true);
  }

  handleDragStart = (e) => {
    e.preventDefault();
    const tempThis3 = this;
    const pageX = isIE ? e.clientX : e.pageX;
    const pageY = isIE ? e.clientY : e.pageY;
    const action = e.target.getAttribute('data-action') || 'move';
    // fix IE probleum
    this.setState({
      startX: pageX,
      startY: pageY,
      dragging: true,
      action,
    });
    if (!action) {
      (function fn() {
        const container = tempThis3.container;
        const offsetLeft = container.offsetLeft;
        const offsetTop = container.offsetTop;
        tempThis3.setState({
          offsetLeft: pageX - offsetLeft,
          offsetTop: pageY - offsetTop,
          frameWidth: 2,
          frameHeight: 2,
        }, () => {
          tempThis3.calcPosition(2, 2, pageX - offsetLeft, pageY - offsetTop);
        });
      }());
    }
  }

  handleDragStop = () => {
    const frameNode = this.frameNode;
    const offsetLeft = frameNode.offsetLeft;
    const offsetTop = frameNode.offsetTop;
    const offsetWidth = frameNode.offsetWidth;
    const offsetHeight = frameNode.offsetHeight;
    const tempState5 = this.state;
    const imgWidth = tempState5.img_width;
    const imgHeight = tempState5.img_height;
    this.setState({
      originX: offsetLeft,
      originY: offsetTop,
      dragging: false,
      frameWidth: offsetWidth,
      frameHeight: offsetHeight,
      maxLeft: imgWidth - offsetWidth,
      maxTop: imgHeight - offsetHeight,
      action: null,
    });
  }

  /* eslint-disable */
  judgeLimit = (width, height, cb) => {
    const { min = {}, max = {} } = this.props;
    if (min.type === 'height' && !(min.value < height)) {
      return;
    }
    if (min.type === 'width' && !(min.value < width)) {
      return;
    }
    if (max.type === 'height' && !(max.value > height)) {
      return;
    }
    if (max.type === 'width' && !(max.value > width)) {
      return;
    }
    cb();
  }

  frameDotMove = (dir, e) => {
    const pageX = isIE ? e.clientX : e.pageX;
    const pageY = isIE ? e.clientY : e.pageY;
    const { over, rate } = this.props;
    const {startX, startY, originX, originY, frameHeight, frameWidth} = this.state;

    if (over || (pageY !== 0 && pageX !== 0)) {
      const tempX = pageX - startX;
      const tempY = pageY - startY;
      let newWidth = frameWidth + tempX;
      let newHeight = newWidth / rate;
      switch (dir) {
        case 'ne':
          this.judgeLimit(newWidth, newWidth / rate, () => {
            this.calcPosition(newWidth, newHeight, originX, originY - (tempX / rate));
          });
          return;
        case 'e':
          this.judgeLimit(newWidth, newWidth / rate, () => {
            this.calcPosition(newWidth, newHeight, originX, originY - ((tempX / rate) * 0.5));
          });
          return;
        case 'se':
          this.judgeLimit(newWidth, newWidth / rate, () => {
            this.calcPosition(newWidth, newHeight, originX, originY);
          });
          return;
        case 'n':
          newHeight = frameHeight - tempY;
          this.judgeLimit(newHeight * rate, newHeight, () => {
            this.calcPosition(newHeight * rate, newHeight, originX + (tempY * rate * 0.5), originY + tempY);
          });
          return;
        case 'nw':
          newWidth = frameWidth - tempX;
          this.judgeLimit(newWidth, newWidth / rate, () => {
            this.calcPosition(newWidth, newWidth / rate, originX + tempX, originY + (tempX / rate));
          });
          return;
        case 'w':
          newWidth = frameWidth - tempX;
          this.judgeLimit(newWidth, newWidth / rate, () => {
            this.calcPosition(newWidth, newWidth / rate, originX + tempX, originY + ((tempX / rate) * 0.5));
          });
          return;
        case 'sw':
          newWidth = frameWidth - tempX;
          this.judgeLimit(newWidth, newWidth / rate, () => {
            this.calcPosition(newWidth, newWidth / rate, originX + tempX, originY);
          });
          return;
        case 's':
          newHeight = frameHeight + tempY;
          this.judgeLimit(newHeight * rate, newHeight, () => {
            this.calcPosition(newHeight * rate, newHeight, originX - (tempY * rate * 0.5), originY);
          });
          return;
        default:
          return '';
      }
    }
  }

  crop = () => {
    const tempState7 = this.state;
    const frameWidth = tempState7.frameWidth;
    const frameHeight = tempState7.frameHeight;
    const originX = tempState7.originX;
    const originY = tempState7.originY;
    const imgWidth = tempState7.img_width;

    const canvas = document.createElement('canvas');
    const img = this.img;
    const rate = img.naturalWidth / imgWidth;
    const realWidth = frameWidth * rate;
    const realHeight = frameHeight * rate;
    canvas.width = realWidth;
    canvas.height = realHeight;

    canvas.getContext('2d').drawImage(img, originX * rate, originY * rate, realWidth, realHeight, 0, 0, realWidth, realHeight);
    return canvas.toDataURL();
  }

  getCropInfo = (x, y, frameWidth, frameHeight) => {
    const tempState7 = this.state;
    const imgWidth = tempState7.img_width;

    const img = this.img;
    const rate = img.naturalWidth / imgWidth;
    const realWidth = frameWidth * rate;
    const realHeight = frameHeight * rate;

    const X = Math.floor(x * rate);
    const Y = Math.floor(y * rate);
    const width = Math.floor(realWidth);
    const height = Math.floor(realHeight);

    if (this.props.type === 'base64') {
      return this.crop(); // 不支持own模式
    }
    if (this.props.over) {
      const valid = {X: X < 0 ? 0 : X, Y: Y < 0 ? 0 : Y};
      let padOverY = Y + height - img.naturalHeight;
      let padOverX = X + width - img.naturalWidth;
      valid.height = height + ( Y < 0 ? Y : 0) - (padOverY > 0 ? padOverY : 0);
      valid.width = width + ( X < 0 ? X : 0) - (padOverX > 0 ? padOverX : 0);
      return { X, Y, width, height, valid, imgWidth: img.naturalWidth, imgHeight: img.naturalHeight};
    }
    return { X, Y, width, height, imgWidth: img.naturalWidth, imgHeight: img.naturalHeight};
  }

  render() {
    let className = ['_cropper'];
    const {imgLoaded, dragging, img_height: imgHeight, img_width: imgWidth} = this.state;
    const {src, disabled, style} = this.props;
    const {height, width} = style;

    if (imgLoaded) className.push('_loaded');
    if (dragging) className.push('_dragging');
    className = className.join(' ');
    if (disabled) className = '_cropper _disabled';
    const hasH = !!Number(imgWidth);
    const imageNode = <img src={src} ref={(node) => { this.img = node; }} width={imgWidth} onLoad={!hasH ? this.imgOnload : undefined} height={hasH ? imgHeight : undefined}/>;

    const node = disabled ? <div className={className} ref={(n) => { this.container = n; }} style={hasH ? {
            position: 'relative',
            width: width || imgWidth,
          } : {
            position: 'relative',
          }}>
          <div className='_source' ref={(node) => { this.sourceNode = node; }} >
            {imageNode}
          </div>
          <div className="_modal" />
    </div> : <div className={className} onMouseLeave={this.handleDragStop} onMouseMove={this.handleDrag} onMouseDown={this.handleDragStart} onMouseUp={this.handleDragStop} ref={(n) => { this.container = n; }} style={{
        position: 'relative',
        height: height || imgHeight,
        lineHeight: `${height || imgHeight}px`,
        width: width || imgWidth,
      }}>
      <div className='_source' ref={(node) => { this.sourceNode = node; }} >
        {imageNode}
         <div className="_frame" ref={(n) => { this.frameNode = n; }}>
          <div className="_clone">
            <img src={src} ref={(n) => { this.cloneImg = n; }} width={imgWidth} height={hasH ? imgHeight : undefined}/>
          </div>
          <span className="_move" data-action="move"></span>
          <span className="_dot _dot-center" data-action="ne"></span>
          <span className="_dot _dot-ne" data-action="ne"></span>
          <span className="_dot _dot-n" data-action="n"></span>
          <span className="_dot _dot-nw" data-action="nw"></span>
          <span className="_dot _dot-e" data-action="e"></span>
          <span className="_dot _dot-w" data-action="w"></span>
          <span className="_dot _dot-se" data-action="se"></span>
          <span className="_dot _dot-s" data-action="s"></span>
          <span className="_dot _dot-sw" data-action="sw"></span>
          <span className="_line _line-n" data-action="n"></span>
          <span className="'_line _line-s" data-action="s"></span>
          <span className="_line _line-w" data-action="w"></span>
          <span className="_line _line-e" data-action="e"></span>
        </div>
      </div>
      <div className="_modal" />
    </div>;

    return node;
  }
}

export default Cropper;
