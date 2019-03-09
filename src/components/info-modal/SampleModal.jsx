import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

function noop() {}

class SampleModal extends Component {
  static propTypes = {
    onOk: PropTypes.func,
    okText: PropTypes.string,
    children: PropTypes.any,
  }

  render() {
    const onOkFunc = this.props.onOk || noop();
    const onOkText = this.props.okText || '确 定';
    const props = {
      footer: [<Button key="submit" type="primary" onClick={onOkFunc}>{onOkText}</Button>],
      ...this.props,
    };

    return (
      <Modal {...props}>
        { this.props.children }
      </Modal>
    );
  }
}

export default SampleModal;
