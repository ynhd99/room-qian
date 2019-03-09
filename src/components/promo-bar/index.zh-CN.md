---
category: Components
type: 其它
title: PromoBar
subtitle: 滚动通知公告
cols: 1
---

## API

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| dataSource | 指定公告项 | Array | [] |
| vertical | 是否垂直滚动 | Boolean | false |
| speed | 滚动速度（横向滚动模式下生效） | Number | 50 |
| duration | 滚动间隔，最小为2，单位/秒（垂直滚动模式下生效） | Number | 5 |
| closable | 是否可关闭 | Boolean | true |
| onClose | 关闭按钮回调 | Function | null |

#### dataSource

| 参数      | 说明                                     | 类型 | 默认值 |
|-----------|-----------------------------------------|-----|--------|
| name | 公告标题 | String | |
| content | 公告内容 | String | |
| link | 公告链接，可选 | String | |
| custom | 自定义公告内容 | String 或 React.Node | |
