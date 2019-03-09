---
category: Components
type: 图形
title: NodeTree
subtitle: 树状图
cols: 1
---

## 何时使用

当树结构的数据需要被展示关系时使用。

## API

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| onLoadData  | 点击结点后的回调函数，用来拿到它的子节点的信息 | Function | |
| renderNode | 结点内布局样式自定义函数， | Function | |
| parentId | 父元素DOM ID | string | |
| url  | 回调函数中需要发送ajax的url | String | |
| extraMsg | 需要额外展示在结点外信息的key  | String | |
| queryKeys | 回调函数中需要用到查询字段的key | Array | |
| defaultPath | NodeTree的初始展开路径 | Array | |
| rootSize | 根结点的样式（宽度和高度）| Object | {width: 200, height: 100} |
| childSize | 非根结点的样式（宽度和高度）| Object | {width: 200, height: 100} |
| divid | 定义树结构中父子层级，兄弟结点之间的间隔| Object | {parent: 35, brother: 25} |
| backwards | 是否倒序生长 | Bool |false |
| showDirectArrow | 是否展示方向箭头 | Bool |false |
