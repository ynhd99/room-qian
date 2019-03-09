import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class TreeNode extends Component {
  static propTypes = {
    node: PropTypes.object,
    expand: PropTypes.bool,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    nodeText: PropTypes.func,
  };

  renderCheckbox() {
    const { node } = this.props;
    const checkState = node.checkState();
    const disableState = node.disableState();
    const checkboxCls = {
      'hermes-tree-checkbox': true,
      'hermes-tree-checkbox-checked': checkState === 1,
      'hermes-tree-checkbox-indeterminate': checkState === -1,
      'hermes-tree-checkbox-disabled': disableState === 1,
    };
    return (
      <span className={classNames(checkboxCls)}>
        <span className="hermes-tree-checkbox-inner" />
      </span>
    );
  }

  renderSwitcher() {
    const { node, onExpand, expand } = this.props;
    const count = node.degree();
    const switcherCls = {
      'hermes-tree-switcher': true,
      'hermes-tree-switcher-noop': count === 0 || node.id === '#',
      'hermes-tree-noline_open': expand && count > 0,
      'hermes-tree-noline_close': !expand && count > 0,
    };
    return count === 0 ? (
      <span className={classNames(switcherCls)} />
    ) : (
      <span className={classNames(switcherCls)} onClick={onExpand} />
    );
  }

  render() {
    const { node, onCheck, nodeText } = this.props;
    const disableState = node.disableState();
    const nodeCls = {
      'hermes-tree-node': node.id !== '#',
      'hermes-tree-node-disabled': disableState === 1,
      'hermes-tree-root': node.id === '#',
    };
    return (
      <div key={node.id} className={classNames(nodeCls)} style={{ marginLeft: (node.depth() - 1) * 16 }}>
        {this.renderSwitcher()}
        <div className="tree-node-text" onClick={onCheck}>
          {this.renderCheckbox()}{nodeText(node)}
        </div>
      </div>
    );
  }
}

export default TreeNode;

