import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/index';

let instanceCount = 0;

class PromoBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    dataSource: PropTypes.array,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    speed: PropTypes.number,
    vertical: PropTypes.bool,
    duration: PropTypes.number,
  };

  static defaultProps = {
    dataSource: [],
    closable: true,
    onClose: () => {},
    speed: 50,
    vertical: false,
    duration: 5,
  };

  constructor(props) {
    super(props);
    const { dataSource } = props;
    const dataDoms = dataSource.map((v, i, a) => {
      const { custom, link, content, name } = v;
      const hasLink = !!link;
      const dom = custom ? (
        <span>{custom}</span>
      ) : (
        <span>
          {i + 1}.【{name}】：{content}
        </span>
      );
      return hasLink ? (
        <a
          style={a.length === 1 && i === 0 ? { marginLeft: 0 } : null}
          key={i}
          className="hermes-promobar-item hermes-promobar-has-link"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={content}
        >
          {dom}
        </a>
      ) : (
        <span
          style={a.length === 1 && i === 0 ? { marginLeft: 0 } : null}
          key={i}
          className="hermes-promobar-item"
        >
          {dom}
        </span>
      );
    });
    this.state = {
      isShow: true,
      dataDoms,
      inlineStyle: null,
    };
  }

  componentDidMount() {
    const { dataDoms } = this.state;
    if (dataDoms.length) {
      this.instance = instanceCount++;
      this.init();
    }
  }

  onHide = () => {
    const { onClose } = this.props;
    this.setState(
      {
        isShow: false,
      },
      onClose,
    );
  };

  init = () => {
    const { vertical } = this.props;
    if (vertical) {
      this.fillPromBarV();
      if (this.isScroll) this.startScrollV();
    } else {
      this.fillPromBar();
      if (this.isScroll) this.startScroll();
    }
  };

  fillPromBar = () => {
    const { speed, dataSource } = this.props;
    const { dataDoms } = this.state;
    const promoContainer = this.hermesPromoContainer;
    const containerW = promoContainer.offsetWidth;
    const listW = promoContainer.children[0].offsetWidth;
    if (dataSource.length === 1 && listW < containerW) {
      this.isScroll = false;
      return;
    }
    this.isScroll = true;
    const repeatTimes = Math.ceil(containerW / listW);
    const dataDomsRepeat = Array.prototype.slice
      .call({ length: repeatTimes + 1 })
      .join(' ')
      .split(' ')
      .map(() => dataDoms);
    const duration = (listW / speed).toFixed(1);
    this.stylesheet.innerHTML = `
      .hermes-promobar-animate-${this.instance} {
        animation: hermes-promobar-scroll-${this.instance} ${duration}s infinite linear;
        animation-play-state: paused;
      }
      @keyframes hermes-promobar-scroll-${this.instance} {
        from { transform: translate(0, 0); }
        to { transform: translate(-${listW}px, 0); }
      }
    `;
    this.setState({
      dataDoms: dataDomsRepeat,
    });
  };

  fillPromBarV = () => {
    const { dataSource } = this.props;
    const { dataDoms } = this.state;
    if (dataSource.length === 1) {
      this.isScroll = false;
      return;
    }
    dataDoms.push(dataDoms[0]);
    const dataDomsRepeat = dataDoms.map((v, i) => (
      <div className="hermes-promobar-item-wrap" key={i}>
        {v}
      </div>
    ));
    this.isScroll = true;
    this.setState({
      dataDoms: dataDomsRepeat,
    });
  };

  stopScroll = () => {
    if (!this.isScroll) return;
    this.setState({
      inlineStyle: { animationPlayState: 'paused' },
    });
  };

  startScroll = () => {
    if (!this.isScroll) return;
    this.setState({
      inlineStyle: { animationPlayState: 'running' },
    });
  };

  stopScrollV = () => {
    if (!this.isScroll) return;
    clearInterval(this.i);
    this.i = null;
  };

  startScrollV = () => {
    const { duration, dataSource } = this.props;
    const promoContainer = this.hermesPromoContainer;
    const containerH = promoContainer.offsetHeight;
    this.offset = this.offset || 0;
    if (!this.isScroll) return;
    const scrollFn = () => {
      this.offset = this.offset - containerH;
      this.setState({
        inlineStyle: { transform: `translateY(${this.offset}px)` },
      });
    };
    this.i = setInterval(() => {
      if (this.offset <= -containerH * dataSource.length) {
        this.offset = 0;
        this.setState({
          inlineStyle: { transition: 'none 0s ease 0s' },
        });
        setTimeout(scrollFn, 20);
      } else {
        scrollFn();
      }
    }, (duration > 2 ? duration : 2) * 1000);
  };

  render() {
    const { className, style, closable, vertical } = this.props;
    const { isShow, dataDoms, inlineStyle } = this.state;
    const { startScroll, startScrollV, stopScroll, stopScrollV, onHide } = this;
    const content = vertical ? (
      <div className="hermes-promobar-list-v" style={inlineStyle}>
        {dataDoms}
      </div>
    ) : (
      <div
        className={`hermes-promobar-list hermes-promobar-animate-${this.instance}`}
        style={inlineStyle}
      >
        {dataDoms}
      </div>
    );
    return isShow ? (
      <div className={`hermes-promobar${className ? ` ${className}` : ''}`} style={style}>
        {closable ? (
          <span className="hermes-promobar-close">
            <a onClick={onHide}>×</a>
          </span>
        ) : null}
        <div
          className="hermes-promobar-container"
          ref={ref => (this.hermesPromoContainer = ref)}
          onMouseEnter={vertical ? stopScrollV : stopScroll}
          onMouseLeave={vertical ? startScrollV : startScroll}
        >
          {content}
        </div>
        <style ref={ref => (this.stylesheet = ref)} />
      </div>
    ) : null;
  }
}

export default PromoBar;
