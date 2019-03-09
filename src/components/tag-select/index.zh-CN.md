---
category: Components
type: 表单扩展
title: TagSelect
subtitle: 标签选择
---

不同类型的标签选择

## 何时使用

选择标签的表单

## API

### TagSelect props

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| options | 指定可选项 | Array[String<标签值>] / Array[Object<详见tag object对象>] |[] |
| limit | 最大选择数量限制 | Number |  |
| limitedDisable | 达到最大选择数量时，其余标签是否禁选 | Boolean | true |
| value | 指定选中的选项 | Array | [] |
| defaultValue | 默认选中的选项 | Array | [] |
| onChange | 变化时的回调函数 | Function(value[, obj]) |  |
| onLimitExceeded | 选择超过最大数量限制时的回调函数（limitedDisable为false时生效） | Function |  |

### RadioSelect props
| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| options | 指定可选项 | Array[String<标签值>] / Array[Object<详见tag object对象>] |[] |
| deselect | 是否可取消选择 | Boolean | false |
| value | 指定选中的选项 | Array | [] |
| defaultValue | 默认选中的选项 | Array | [] |
| onChange | 变化时的回调函数 | Function(value[, obj]) |  |

### tag object

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| label | 标签名 | String | '' |
| value | 标签值 | String | '' |
| disabled | 是否禁选 | Boolean | false |
