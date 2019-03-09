import React, { Component, PropTypes } from 'react';
import { Row, Col, Spin } from 'antd';
import { includes, noop } from 'lodash';
import ReactList from 'react-list';
import './index.less';
import Node from './tree-node.jsx';
import Tree from './node-model.jsx';
import {
  DEFAULT_ASYNC_NODE_TEXT,
  DEFAULT_NO_FOUND_CONTENT,
  toggle,
  DEFAULT_ROOT,
} from './utils.jsx';

class AsyncTree extends Component {
  static propTypes = {
    treeData: PropTypes.array,
    checked: PropTypes.array,
    disabled: PropTypes.array,
    onChange: PropTypes.func,
    fetch: PropTypes.func,
    nodeText: PropTypes.func,
    searchValue: PropTypes.any,
    showCheckAll: PropTypes.bool,
    onlyLeft: PropTypes.bool,
  };

  static defaultProps = {
    onChange: noop,
    showCheckAll: true,
    onlyLeft: false,
    nodeText: DEFAULT_ASYNC_NODE_TEXT,
    notFoundContent: DEFAULT_NO_FOUND_CONTENT,
    treeData: [],
  };

  componentWillMount() {
    this.reset();
  }

  componentWillReceiveProps(props) {
    const { model } = this.state;
    const { searchValue, fetch } = props;
    if (this.props.searchValue !== searchValue) {
      if (searchValue) {
        this.setState({
          loading: true,
        });
        let searchModel = new Tree(
          { ...DEFAULT_ROOT },
          {
            fetch: node => fetch(node, searchValue),
            async: true,
          },
        );
        searchModel.fetch().then(() => {
          searchModel.correctDegree();
          if (searchModel.degree() === 0) {
            searchModel = null;
          } else {
            searchModel.merge(model);
            model.merge(searchModel, true);
          }
          this.setState({
            searchModel,
            searchExpandKey: ['#'],
            loading: false,
            searching: true,
          });
        });
      } else {
        this.setState({
          searchModel: null,
          loading: false,
          searching: false,
        });
      }
    }
  }

  onCheck(id, isRight) {
    const { onChange } = this.props;
    const handler = (model) => {
      const checked = model.checked();
      const checkedIds = checked.map(item => item.id);
      (onChange || noop)(checkedIds, model);
    };
    const { model, searchModel, searching } = this.state;
    if (isRight) {
      const node = model.get(id);
      if (searching) {
        if (searchModel) {
          const n = searchModel.get(id);
          if (n) {
            n.uncheck();
          }
        }
      } else if (node) {
        node.uncheck();
      }
      this.setState({
        rightModel: model.checkedTree(),
      });
      handler(model);
    } else if (!searching) {
      const node = model.get(id);
      if (node) {
        if (node.needFetch(true)) {
          this.setState({
            loading: true,
          });
        }
        node.fetch(true).then(() => {
          node.toggleCheck();
          this.setState({
            loading: false,
            rightModel: model.checkedTree(),
          });
          handler(model);
        });
      }
    } else {
      const node = searchModel.get(id);
      if (node) {
        if (node.needFetch(true)) {
          this.setState({
            loading: true,
          });
        }
        node.fetch(true).then(() => {
          node.toggleCheck();
          model.get(id).merge(node, true);
          this.setState({
            loading: false,
            rightModel: model.checkedTree(),
          });
          handler(model);
        });
      }
    }
  }

  onExpand(id, isRight) {
    const {
      model,
      searching,
      searchModel,
      searchExpandKey,
      leftExpandKey,
      rightExpandKey,
    } = this.state;
    if (isRight) {
      this.setState({
        rightExpandKey: toggle(rightExpandKey, id),
      });
    } else if (searching) {
      const node = searchModel.get(id);
      if (node) {
        if (node.needFetch(true)) {
          this.setState({
            loading: true,
          });
        }
        node.fetch().then(() => {
          searchModel.merge(model);
          model.get(id).merge(node, true);
          this.setState({
            searchExpandKey: toggle(searchExpandKey, id),
            loading: false,
          });
        });
      }
    } else {
      const node = model.get(id);
      if (node) {
        if (node.needFetch(true)) {
          this.setState({
            loading: true,
          });
        }
        node.fetch().then(() => {
          this.setState({
            leftExpandKey: toggle(leftExpandKey, id),
            loading: false,
          });
        });
      }
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

  reset() {
    const { treeData, checked, disabled, fetch, searchValue } = this.props;
    const model = new Tree({ ...DEFAULT_ROOT, children: treeData }, { fetch, async: true });
    if (checked) {
      checked.forEach((id) => {
        model.get(id).check();
      });
    }
    if (disabled) {
      disabled.forEach((id) => {
        model.get(id).disable();
      });
    }
    let searchModel = null;
    let rightModel;
    this.setState({
      loading: true,
      model,
      leftExpandKey: [],
      rightExpandKey: [],
      searchExpandKey: [],
    });
    const ps = [];
    ps.push(model.fetch());
    if (searchValue) {
      searchModel = new Tree(
        { ...DEFAULT_ROOT },
        {
          fetch(node) {
            return fetch(node, searchValue);
          },
          async: true,
        },
      );
      ps.push(searchModel.fetch());
    }
    Promise.all(ps).then(() => {
      model.correctDegree();
      if (searchModel) {
        searchModel.correctDegree();
        if (searchModel.degree() === 0) {
          searchModel = null;
        } else {
          searchModel.merge(model);
          model.merge(searchModel, true);
        }
      }
      rightModel = model.checkedTree();
      this.setState({
        model,
        rightModel,
        searchModel,
        loading: false,
        searching: !!searchValue,
      });
    });
  }

  render() {
    const { model, searchModel, searching, loading } = this.state;
    const tree = searching ? searchModel : model;
    const { notFoundContent, onlyLeft, showCheckAll } = this.props;
    const rootDegree = tree ? tree.degree() : 0;
    const left = (
      <div className="hermes-tree-select-container">
        <div className="header">
          {rootDegree && showCheckAll ? (
            <Node
              node={tree}
              onCheck={this.onCheck.bind(this, '#', false)}
              nodeText={() => undefined}
            />
          ) : (
            false
          )}
          {this.props.nodeText.call(tree, tree)}
        </div>
        <div className="content">
          <Spin spinning={loading}>{tree ? this.getContent() : notFoundContent()}</Spin>
        </div>
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

export default AsyncTree;
