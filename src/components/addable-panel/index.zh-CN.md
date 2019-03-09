---
category: Components
type: 可增加的模块
title: AddablePanel
subtitle: 可增加的面板
cols: 1
---

可增加表单区块的组件

## 何时使用

卡片式表单的添加场景

## API

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| options | 必填，配置项，配置每个行/列里面的表单项，详见下面表格 | Array[ Object ] | |
| form | 如果options中需要传入formFieldProps，则必须传入rc-form对象 | Object | |
| max | 最大项数 | Number | Infinity |
| btnText | 新增按钮的名称 | String | '新增' |
| draggable | 面版是否可拖拽 | Boolean | false |
| disabled | 是否禁用组件 | Boolean | false |
| onAddRow | 添加新项触发的函数 | Function(rowId, rowIds) | 无 |
| onRemoveRow | 删除旧项触发的函数 | Function(rowId, rowIds) | 无 |


#### options 每一项的参数

| 参数      | 说明                                     | 类型 | 默认值 |
|-----------|-----------------------------------------|-----|--------|
| name | 必填且不可重复，该表单单元的键值名 | string | |
| render | 必填，需要渲染的表单单元 | Function(rowId, formProps[注1]) | |
| formFieldProps | react-component/form.getFieldProps的option参数 [详见antd参数](http://antd.alipay.net/components/form/#getFieldProps-options) | Object | 无 |

传入options中的formFieldProps参数可以让render方法中的组件如同普通Form组件一样使用 react-component/form 的特性。

注1：如果渲染的是表单对象，则必须将formProps作为参数传入表单中。如：

```js
<Input {...formProps} />
```
