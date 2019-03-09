---
category: Components
type: 表单扩展
title: SelectRender
subtitle: 选择渲染
cols: 1
---

前置一个选择框，根据选择渲染不同的内容

## 何时使用

复合表单，根据前面选择框渲染不同的表单项（输入框、文本框、多个组合等）

## API

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| options | 必填，配置项，配置每个选项渲染的内容 | Array[ Object ] | |
| defaultType | 前置选择框默认选择 | String | 自动计算可见选项集的第一个 |
| disabled | 下拉框是否禁用 | Boolean | false |
| getPopupContainer | 前置选择框菜单渲染父节点。[参见 antd/Select](http://antd.alipay.net/components/select/#Select-props) | Function(triggerNode) | () => document.body |
| value | 可传入该项指定组件内表单的值，一般和 antd/Form 配合使用 | Object | {} |
| onChange | 可监听组件内表单值的变化，一般和 antd/Form 配合使用 | Function(value) | |


#### options 每一项的参数

| 参数      | 说明                                     | 类型 | 默认值 |
|-----------|-----------------------------------------|-----|--------|
| key | 必填且不可重复，选项的键值名 | string | |
| name | 必填且不可重复，选项的显示名称 | string | |
| render | 必填，选择该项渲染的内容 | Function(value, onValueChange[注1]) | |
| disabled | 该选项是否禁止选择 | Boolean | false |
| display | 填入（'inline'或'block'），分别对应渲染内容行内显示或换行显示 | String | 'inline' |

注1：将render方法的两个参数正确地传入表单组件中，才能使用API中value和onChange的功能。

首先需要指定一个唯一的表单名称，例如"address":

```js
<Input value={value.address}
  onChange={(e) => onValueChange(e, 'address')} />
```

此后组件传入onChange方法监听value值，就能获取 value.address 的值。
