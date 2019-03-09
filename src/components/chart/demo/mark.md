---
order: 3
title:
  zh-CN: 添加标记
  en-US: add mark
---

## zh-CN

添加标记。

## en-US

add mark.

````jsx
import { Row, Col } from 'antd';
import { Chart } from 'hermes-react';

const data1 = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
const data2 = [1, 2, 3, 4, 5, 6, 7];

const markLine = (<Chart.MarkLine data={[{name:'平均每天吃几个', type: 'average'}]} onClick={()=>{console.log(111)}}/>);
const markPoint = (<Chart.MarkPoint data={[{name:'最大值', type: 'max'}]} />);
const content = (
<Chart style={{ height: 400, width: '100%' }} onChartReady={(chart) => {console.log(chart)}}>
    <Chart.Tooltip trigger="axis" />
    <Chart.XAxis data={data1}/>
    <Chart.YAxis/>
    <Chart.Line name="包子" data={data2} markLine={markLine} markPoint={markPoint}/>
</Chart>
);

ReactDOM.render(content, mountNode);
````

