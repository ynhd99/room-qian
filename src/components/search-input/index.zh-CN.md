---
category: Components
type: 表单扩展
title: SearchInput
subtitle: 搜索输入框
---

## API
### SearchInput props

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| value | 输入框的值 | String |  |
| defaultValue | 输入框默认值 | String | '' |
| placeholder | 输入框占位符 | String | '' |
| size | 输入框大小，可选 `large` `small` | String | 'default' |
| fetchData | 自动补全时获取补全结果的函数 | Function(value, callback(调用参数见下方介绍)) |  |
| onChange | 输入框值变化时回调 | Function(value) |  |
| onSearch | 搜索按钮触发时回调 | Function(value) |  |

### fetchData callback params

| 参数        | 说明           |
|-------------|----------------|
| value | 查询的value值 |
| data | [{ key: String, value: String, disabled: Boolean }, {}, {}...] 同Select.Option props  |
