import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Node extends Component {
  static propTypes = {
    nodeRender: PropTypes.func,
    onClick: PropTypes.func,
    nodeData: PropTypes.object,
    isChosen: PropTypes.bool,
    style: PropTypes.object,
  };

  render() {
    return (
      <div
        data-layoutId={this.props.nodeData.nodeLayoutId}
        data-hasChildren={(this.props.nodeData.children && this.props.nodeData.children.length > 0)}
        className={this.props.isChosen ? 'node-container chosen' : 'node-container'}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.nodeRender(this.props.nodeData)}
      </div>
    );
  }
}

export default Node;
