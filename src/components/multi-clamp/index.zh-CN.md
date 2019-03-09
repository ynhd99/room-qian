---
category: Components
type: 其它
title: MultiClamp
subtitle: 多行文本裁剪
cols: 2
---

## API

| 参数            | 说明                                                                                        | 类型                    | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| ellipsis        | 超出最大行数裁剪后的省略符号                                                                | String 或 React.Element | '...'  |
| clamp           | 裁剪最大行数。设置为字符串'auto'时会根据最大高度自适应裁剪，此时文本容器需要定义高度        | Number 或 'auto'        | 3      |
| reverse         | 是否反向裁剪                                                                                | Boolean                 | false  |
| splitByWords    | 对于英文，是否按单词逐个裁剪（默认按字母）                                                  | Boolean                 | false  |
| disableCssClamp | 是否禁用原生 css 裁剪（当 ellipsis 被设置为'...'时，组件会优先使用 webkit 的原生 css 裁剪） | Boolean                 | false  |
