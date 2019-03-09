---
order: 0
title:
  zh-CN: 同步树
  en-US: SyncTree
---

## zh-CN

最基本的用法，固定树形数据展示。

## en-US

basic demo, SyncTree.

```jsx
import { TreeSelect } from 'hermes-react';
import cities from './cities.jsx'; // 载入城市数据

const loop = (data)=> {
  data.forEach((item)=> {
    const {c, i, n} = item;
    item.children = c;
    item.id = i;
    item.name = n;
    if (c) {
      loop(c);
    }
  });
};
loop(cities);

const content = (
  <TreeSelect
    treeData={cities}
    checked={['340822', '340826']}
    disabled={['340822', '340826']}
    defaultExpandLevel={2}
    onChange={ (ids, tree) => console.log('SyncTree:', ids, tree) }
  />
);

ReactDOM.render(content, mountNode);
```
