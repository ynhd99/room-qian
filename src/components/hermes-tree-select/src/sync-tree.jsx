import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import { includes, noop } from 'lodash';
import ReactList from 'react-list';
import './index.less';
import Node from './tree-node.jsx';
import Tree from './node-model.jsx';
import { toggle, DEFAULT_SYNC_NODE_TEXT, DEFAULT_NO_FOUND_CONTENT } from './utils.jsx';

class SyncTree extends Component {
  static propTypes = {
    treeData: PropTypes.array.isRequired,
    checked: PropTypes.array,
    disabled: PropTypes.array,
    onChange: PropTypes.func,
    nodeText: PropTypes.func,
    search: PropTypes.func,
    searchValue: PropTypes.any,
    defaultExpandLevel: PropTypes.number,
    onlyLeft: PropTypes.bool,
  };

  static defaultProps = {
    onChange: noop,
    showCheckAll: true,
    onlyLeft: false,
    notFoundContent: DEFAULT_NO_FOUND_CONTENT,
    nodeText: DEFAULT_SYNC_NODE_TEXT,
    defaultExpandLevel: 0,
    treeData: [],
  };

  componentWillMount() {
    this.reset();
  }

  componentWillReceiveProps(props) {
    const { search, searchValue, treeData } = props;
    if (treeData !== this.props.treeData) {
      this.reset(props);
    } else {
      const { model } = this.state;
      if (!searchValue) {
        this.setState({
          searching: false,
          searchValue: null,
          searchModel: null,
          searchExpandKey: [],
        });
      } else if (this.props.searchValue !== searchValue) {
        const searchModel = model.search(node => search.call(model, searchValue, node));
        const searchExpandKey = searchModel ? searchModel.getExpandKeyByLevel(Infinity) : [];
        this.setState({
          searchModel,
          searching: true,
          searchExpandKey,
        });
      }
    }
  }

  onCheck(id, isRight) {
    const { onChange } = this.props;
    const { model, searching, searchModel } = this.state;
    if (searching && searchModel) {
      const node = searchModel.get(id);
      if (node) {
        if (isRight) {
          model.get(id).uncheck();
          node.uncheck();
        } else {
          node.toggleCheck();
        }
        model.merge(searchModel);
      }
    } else {
      const node = model.get(id);
      if (node) {
        if (isRight) {
          node.uncheck();
        } else {
          node.toggleCheck();
        }
      }
    }
    const checked = model.checked();
    const checkedIds = checked.map(node => node.id);
    (onChange || noop)(checkedIds, model);
    this.setState({
      rightModel: model.checkedTree(),
    });
  }

  onExpand(id, isRight) {
    const { searchExpandKey, leftExpandKey, rightExpandKey, searching } = this.state;
    if (isRight) {
      this.setState({
        rightExpandKey: toggle(rightExpandKey, id),
      });
    } else if (searching) {
      this.setState({
        searchExpandKey: toggle(searchExpandKey, id),
      });
    } else {
      this.setState({
        leftExpandKey: toggle(leftExpandKey, id),
      });
    }
  }

  getNode(node, isRight) {
    const { nodeText: _nodeText } = this.props;
    const { leftExpandKey, rightExpandKey, searchExpandKey, model, searching } = this.state;
    const id = node.id;
    const onCheck = this.onCheck.bind(this, id, isRight);
    const onExpand = this.onExpand.bind(this, id, isRight);
    const nodeText = item => _nodeText.call(model, item, isRight);
    let expand;
    if (isRight) {
      expand = includes(rightExpandKey, id);
    } else if (searching) {
      expand = includes(searchExpandKey, id);
    } else {
      expand = includes(leftExpandKey, id);
    }
    return <Node key={node.id} {...{ node, nodeText, expand, onCheck, onExpand }} />;
  }

  getRenderInfo(isRight) {
    const {
      model,
      searching,
      searchModel,
      rightModel,
      searchExpandKey,
      leftExpandKey,
      rightExpandKey,
    } = this.state;
    let tree;
    let expandIds;
    if (isRight) {
      tree = rightModel;
      expandIds = rightExpandKey;
    } else if (searching) {
      tree = searchModel;
      expandIds = searchExpandKey;
    } else {
      tree = model;
      expandIds = leftExpandKey;
    }
    return { tree, expandIds };
  }

  getTreeItem(isRight, index) {
    const { tree, expandIds } = this.getRenderInfo(isRight);
    let rtn = false;
    if (tree) {
      const node = tree.getNodeByIndex(expandIds, index);
      rtn = this.getNode(node, isRight);
    }
    return rtn;
  }

  getContent(isRight) {
    const { tree, expandIds } = this.getRenderInfo(isRight);
    let rtn = false;
    if (tree) {
      rtn = (
        <ReactList
          itemRenderer={this.getTreeItem.bind(this, isRight)}
          length={tree.getVisibleLength(expandIds)}
          type="uniform"
        />
      );
    }
    return rtn;
  }

  reset(props = this.props) {
    const { treeData, checked, disabled, search, searchValue } = props;
    const data = { id: '#', name: 'ROOT', children: treeData };
    const model = new Tree(data);
    const leftExpandKey = model.getExpandKeyByLevel(this.props.defaultExpandLevel);
    const rightExpandKey = [...leftExpandKey];
    const searchExpandKey = [...leftExpandKey];
    let searchModel;
    let rightModel;
    if (checked) {
      checked.forEach((id) => {
        const node = model.get(id);
        // if (!node.isLeaf()) {
        //   console.warn(`node which id is ${id} not a leaf node`);
        // }
        if (node) {
          node.check();
        } else {
          console.warn(`cannot find node which id is ${id}`);
        }
      });
    }
    if (disabled) {
      disabled.forEach((id) => {
        const node = model.get(id);
        if (node) {
          node.disable();
        } else {
          console.warn(`cannot find node which id is ${id}`);
        }
      });
    }
    if (searchValue) {
      searchModel = model.search(node => search.call(model, searchValue, node));
      rightModel = searchModel.checkedTree();
    } else {
      rightModel = model.checkedTree();
    }
    this.setState({
      model,
      searchModel,
      rightModel,
      searching: !!searchValue,
      leftExpandKey,
      rightExpandKey,
      searchExpandKey,
    });
  }
  render() {
    const { model, searchModel, searching } = this.state;
    const tree = searching ? searchModel : model;
    const { notFoundContent, onlyLeft, showCheckAll } = this.props;
    const rootLeafCount = tree ? tree.leafs().length : 0;
    const left = (
      <div className="hermes-tree-select-container">
        <div className="header">
          {rootLeafCount && showCheckAll ? (
            <Node
              node={tree}
              onCheck={this.onCheck.bind(this, '#', false)}
              nodeText={() => false}
            />
          ) : (
            false
          )}
          {this.props.nodeText.call(tree, tree)}
        </div>
        <div className="content">{rootLeafCount > 0 ? this.getContent() : notFoundContent()}</div>
      </div>
    );
    return onlyLeft ? (
      left
    ) : (
      <Row gutter={16}>
        <Col span="12">{left}</Col>
        <Col span="12">
          <div className="hermes-tree-select-container">
            <div className="header">{this.props.nodeText.call(model, model, true)}</div>
            <div className="content">{this.getContent(true)}</div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default SyncTree;
