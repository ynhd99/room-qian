---
category: Components
type: 表单扩展
title: TreeSelect
subtitle: 树选择
cols: 1
---
## 何时使用

树形结构数据选择，用于门店选择、城市选择等场景。

可以支持同步数据、异步数据、搜索支持。

## API

### 同步树用法
| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| treeData | 树的数据 | array<{id, name, children}> | |
| checked | 默认选中的节点Id | array<'id'> | |
| disabled | 默认禁用的节点Id | string | |
| onChange | 在节点选中或者取消选中时触发 | function(ids(选中的Id列表), treenode(组件内部的树模型，[注1](#注1))) | |
| showCheckAll | 是否需要全选功能 | boolean | true |
| onlyLeft | 只显示左边 | boolean | false |
| defaultExpandLevel | 默认展开到哪个层级 | number | 0  |
| search | 搜索逻辑, 当searchValue变化的时候调用改方法 | function |  |
| searchValue | 搜索的值 | any |  |
| nodeText | 节点渲染逻辑 | function | [注2](#注2) |

### TreeSelect.AsyncTree 异步树用法

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| treeData | 树的数据 | array<{id, name, children}> | |
| checked | 默认选中的节点Id | array | |
| disabled | 默认禁用的节点Id | string | |
| onChange | 在节点选中或者取消选中时触发 | function(ids(选中的Id列表), treenode(组件内部的树模型，[注1](#注1))) | | 
| showCheckAll | 是否需要全选功能 | boolean | true |
| onlyLeft | 只显示左边 | boolean | false |
| fetch | 节点获取逻辑, 当searchValue变化的时候调用改方法, 或者展开的时候  | function |  |
| searchValue | 搜索的值 | any |  |
| nodeText | 节点渲染逻辑 | function | [注2](#注2) |

#### 注1

组件内部的树模型支持的方法
  
* get(id) 返回指定Id的节点
* depth() 节点的深度
* degree() 返回节点子节点的数量(节点的度)
* isRoot() 是否为根节点
* isLeaf() 是否为叶子节点
* parent() 节点的父节点
* children() 节点的子节点
* ancestors() 节点的所有祖先节点
* leafs() 返回该节点的所有叶子节点
* checkState() 返回节点的选中状态  如果是叶子节点,只有 0 1两个状态 如果非叶子节点 有三种状态 0 1 -1;
* disableState() 返回所有被禁用的叶子节点 只有两种状态 0 1
* checked()  返回所有被选中的叶子节点(包括被禁用的节点)
* disabled() 返回所有被禁用的叶子节点

#### 注2

nodeText 节点描述信息, 默认为: 

```javascript
const DEFAULT_NODE_TEXT = (node, isRight) =>  {
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
```
