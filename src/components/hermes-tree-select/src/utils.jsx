import React from 'react';
import { Icon } from 'antd';

export const DEFAULT_SYNC_NODE_TEXT = (node, isRight) => {
  let rtn = false;
  if (node) {
    if (isRight) {
      if (node.id === '#') {
        rtn = (<span>已选 {`${node.checked().length}`}</span>)
      } else if (node.isLeaf()) {
        rtn = (<span>{node.model.name}</span>);
      } else {
        rtn = (<span>{node.model.name}({node.checked().length})</span>);
      }
    } else if (node.id === '#') {
      rtn = (<span>共 {`${node.leafs().length}`}</span>)
    } else if (node.isLeaf()) {
      rtn = (<span>{node.model.name}</span>);
    } else {
      rtn = (<span>{node.model.name}({node.leafs().length})</span>);
    }
  } else {
    rtn = (<span>搜索结果为空</span>);
  }
  return rtn;
};

export const DEFAULT_ASYNC_NODE_TEXT = (node, isRight) => {
  let rtn = false;
  if (node) {
    if (isRight) {
      if (node.id === '#') {
        rtn = (<span>已选 {`${node.checked().length}`}</span>)
      } else if (node.isLeaf()) {
        rtn = (<span>{node.model.name}</span>);
      } else {
        rtn = (<span>{node.model.name}({node.checked().length})</span>);
      }
    } else if (node.id === '#') {
      rtn = '全选'
    } else if (node.isLeaf()) {
      rtn = (<span>{node.model.name}</span>);
    } else {
      rtn = (<span>{node.model.name}({node.degree()})</span>);
    }
  } else if (!isRight) {
    rtn = (<span>搜索结果为空</span>);
  } else {
    rtn = (<Icon type="loading" />);
  }
  return rtn;
};

export const DEFAULT_NO_FOUND_CONTENT = () => {
  return (
    <div className="no-leaf">
      <Icon type="meh" /> Not Found
    </div>
  );
};

export const toggle = (array, value) => {
  const rtn = [...array];
  const index = rtn.indexOf(value);
  if (index === -1) {
    rtn.push(value);
  } else {
    rtn.splice(index, 1);
  }
  return rtn;
};

export const DEFAULT_ROOT = {
  id: '#',
  name: 'ROOT',
  count: 1e5,
};
