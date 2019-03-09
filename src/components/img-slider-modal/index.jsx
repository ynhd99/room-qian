import React, { Component } from 'react';
import { Modal, Carousel, Icon } from 'antd';
import PropTypes from 'prop-types';
import './style/index';

class PrevArrow extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div
        className={`arrow-prev${!this.props.onClick ? ' arrow-disabled' : ''}`}
        onClick={onClick}
      >
        <Icon type="left" />
      </div>
    );
  }
}

class NextArrow extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div
        className={`arrow-next${!this.props.onClick ? ' arrow-disabled' : ''}`}
        onClick={onClick}
      >
        <Icon type="right" />
      </div>
    );
  }
}

class ImgSliderModal extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    imgList: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    arrows: PropTypes.bool,
    dots: PropTypes.bool,
    infinite: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    imgList: [],
    width: 688,
    height: 500,
    arrows: true,
    dots: true,
    infinite: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { className, style, children, list, width, height, dots } = this.props;
    const { showModal } = this.state;
    const simpleMode = list && list.length && typeof list[0] === 'string';
    return children ? (
      <div className={`hermes-imageslider${className ? ` ${className}` : ''}`} style={style}>
        {list.length && showModal ? (
          <Modal
            className="hermes-imageslider-modal"
            width={`${width + 32}px`}
            visible
            maskClosable={false}
            footer={null}
            onCancel={this.hideModal}
          >
            <Carousel
              {...this.props}
              className={`hermes-imageslider-carousel${!dots ? ' no-padding' : ''}`}
              style={null}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
            >
              {list.map((v, i) => (
                <div
                  className="hermes-imagewrap"
                  style={{ height: `${height}px`, lineHeight: `${height}px` }}
                  key={i}
                >
                  <img
                    alt={simpleMode ? '' : v.alt}
                    style={{ maxHeight: `${height}px`, maxWidth: `${width}px` }}
                    src={simpleMode ? v : v.src}
                  />
                  {!simpleMode && 'desc' in v && v.desc !== '' ? <div>{v.desc}</div> : null}
                </div>
              ))}
            </Carousel>
          </Modal>
        ) : null}
        <div className="hermes-imageslider-trigger" onClick={this.showModal}>
          {children}
        </div>
      </div>
    ) : null;
  }
}

export default ImgSliderModal;
