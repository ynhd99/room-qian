---
category: Components
type: 图形
title: Chart
subtitle: 图表
cols: 1
---

## 何时使用

当树结构的数据需要被展示关系时使用。

## 如何引入

由于 Chart 文件体积较大，从 `v1.5.0` 后将不放在整个 hermes-react 包内。使用该功能请额外引入js文件（290kb）：

```
<script charset="uft-8" src="https://gw.alipayobjects.com/as/g/hermes/hermes-react-chart/1.0.8/index.js"></script>
```

## API

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| onChartReady  | 当chart render 后触发一次, 理论上值触发一次, 参数为chart实例 | Function | |
| onGlobalOut  | 当鼠标移除chart后触发 | Function | |
| loading | 是否为loading状态 | boolean | |
| theme | 主题 | string | |
| showLegend | 自动显示Legend | boolean | false |

其他组件

* Title,
* Tooltip, 
* Legend,
* VisualMap,
* DataZoom,
* Grid,
* RadarCsys,
* Polar,
* XAxis,
* YAxis,
* AngleAxis,
* RadiusAxis,
* Line,
* Bar,
* Pie,
* Scatter,
* Funnel,
* Radar,
* MarkPoint,
* MarkArea,
* MarkLine,


