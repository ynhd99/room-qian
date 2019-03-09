import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SampleModal from './SampleModal';
import './style/index';

function noop() {}

class InfoModal extends Component {
  static propTypes = {
    style: PropTypes.object,
    trigger: PropTypes.any,
    children: PropTypes.any,
    className: PropTypes.string,
    onOk: PropTypes.func,
    okText: PropTypes.string,
  };

  static defaultProps = {
    trigger: '查看',
    title: '查看',
    onOk: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
    this.props.onOk();
  };

  render() {
    const { trigger, style, className, ...others } = this.props;
    const newStyle = {
      display: 'inline-block',
      ...style,
    };

    const props = {
      ...others,
      visible: this.state.visible,
      onOk: this.hideModal,
      onCancel: this.hideModal,
    };

    return (
      <div style={newStyle} className={className}>
        <a onClick={this.showModal}>{trigger}</a>
        <SampleModal {...props}>{this.props.children}</SampleModal>
      </div>
    );
  }
}

export default InfoModal;
