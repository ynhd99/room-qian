## 同步树
```html
 <Tree
  treeData = { cities }
  checked = { ['340803','340824'] }
  onChange = {this.onChange.bind(this) }
  searchValue = {this.state.searchValue }
  search = { this.search.bind(this) }
/>
```

* __treeData格式要求__

```javascript
[
  {
   id:'123',
   name:'Text', // 并不是必须的
   children:[{...}]
  }
]

// id 要求全局唯一的,
```

* treeData 节点信息
* checked 默认选中的节点id
* disabled 默认禁用的节点id
* onChange 在节点选中或者取消选中时触发,传入参数为ids 和 TreeModel
* showCheckAll 是否显示全选(默认是false)
* onlyLeft 只显示左边
* defaultExpandLevel: 默认展开到哪个层级
* onlyLeft 只显示左边节点
* searchValue 搜索的值
* search 搜索逻辑
 `searchValue` 和 `search` 配合使用来完成对树的搜索功能, 在`searchValue`变化时会便利所有节点, 然后把 `searchValue` 和当前节点
  的信息, this指向树model(Node);
  
* nodeText 节点描述信息, 默认为: 

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

// node 当前节点
// isRight 是否为右边节点
// this TreeModel(Node)
```


## 异步树

``` javascript
import Tree from 'hermes-tree-select';

const AsyncTree = Tree.AsyncTree
```

* treeData 节点信息 需要传入初始化节点(一般为所有你传入的选中节点的信息)
* checked 默认选中的节点id
* disabled 默认禁用的节点id
* onChange 在节点选中或者取消选中时触发,传入参数为ids 和 TreeModel
* showCheckAll 是否显示全选(默认是false)
* onlyLeft 只显示左边节点
* searchValue 搜索的值
* fetch 节点获取逻辑
 `searchValue` 和 `fetch` 配合使用来完成对树的搜索功能
 
 ``` javascript
 fetch(node, searchValue) {
     return new Promise(resolve => {
       setTimeout(() => {
         if (!searchValue) {
           if (node.id === '#') {
             resolve(cloneDeep(cloneDeep(twoLevelAsync.children)))
           } else if (node.id === '0') {
             resolve(cloneDeep(cloneDeep(part0)))
           } else if (node.id === '1') {
             resolve(cloneDeep(part1));
           }
         } else {
           if (node.id === '#') {
             resolve(cloneDeep(searchData.children))
           } else if (node.id === '0') {
             resolve(cloneDeep(searchPart0))
           }
         }
       }, Math.random() * 2000)
     });
   }
 ```

```html
 <AsyncTree
  treeData={treeData}
  checked={['02']}
  disabled={['02']}
  fetch={this.fetch.bind(this)}
  searchValue={this.state.searchValue}
  onChange={this.onChange.bind(this)}
/>
```

### Node
  
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
