---
order: 2
title:
  zh-CN: 提示
  en-US: tooltip
---


## zh-CN

自定义tooltip。

## en-US

custom tooltip.

````jsx
import { Row, Col } from 'antd';
import { Chart } from 'hermes-react';

const data1 = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
const data2 = [1, 2, 3, 4, 5, 6, 7];

const tooltip = (data) => {
    const [lineData] = data;
    return (<div>{lineData.name} : 我吃了{lineData.value}个包子!! 哈哈</div>)
}
const content = (
<Chart style={{ height: 400, width: '100%' }} onChartReady={(chart) => {console.log(chart)}}>
    <Chart.Tooltip trigger="axis" formatter={tooltip}/>
    <Chart.XAxis data={data1}/>
    <Chart.YAxis/>
    <Chart.Line name="包子" data={data2} />
</Chart>
);

ReactDOM.render(content, mountNode);
````

