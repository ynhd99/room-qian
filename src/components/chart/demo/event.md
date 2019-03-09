---
order: 0
title:
  zh-CN: 添加事件
  en-US: add events
---

## zh-CN

添加事件。

## en-US

add events.

````jsx
import { Row, Col } from 'antd';
import { Chart } from 'hermes-react';

const data1 = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
const data2 = [1, 2, 3, 4, 5, 6, 7];
const data3 = [
    {value:335, name:'直接访问'},
    {value:310, name:'邮件营销'},
    {value:234, name:'联盟广告'},
    {value:135, name:'视频广告'},
    {value:1548, name:'搜索引擎'}
];
const data4 =[
    { name: '销售（sales）', max: 6500},
    { name: '管理（Administration）', max: 16000},
    { name: '信息技术（Information Techology）', max: 30000},
    { name: '客服（Customer Support）', max: 38000},
    { name: '研发（Development）', max: 52000},
    { name: '市场（Marketing）', max: 25000}    
]

const data5 = [
  {
      value : [4300, 10000, 28000, 35000, 50000, 19000],
      name : '预算分配（Allocated Budget）'
  },
   {
      value : [5000, 14000, 28000, 31000, 42000, 21000],
      name : '实际开销（Actual Spending）'
  }
]
const content = (
<Row>
    <Col span="12">
        <Chart style={{ height: 400, width: '100%' }} onChartReady={(chart) => {console.log(chart)}}>
            <Chart.Tooltip trigger="axis"/>
            <Chart.XAxis data={data1} onClick={(e) => { console.log(e) }}/>
            <Chart.YAxis onClick={(e) => { console.log(e) }}/>
            <Chart.Line name="包子" data={data2} onClick={(e) => { console.log(e) }}/>
        </Chart>
    </Col>
    <Col span="12">
        <Chart style={{ height: 400, width: '100%' }}>
            <Chart.Tooltip trigger="axis"/>
            <Chart.XAxis data={data1}/>
            <Chart.YAxis />
            <Chart.Bar name="包子" data={data2} onClick={(e) => { console.log(e) }}/>
        </Chart>
    </Col>   
    <Col span="12">
        <Chart style={{ height: 400, width: '100%' }}>
            <Chart.Tooltip trigger="item"/>
            <Chart.Pie data={data3} selectedMode="single" onClick={(e) => { console.log(e) }} onPieSelectChanged={(e) => {console.log(e)}}/>
        </Chart>
    </Col>  
</Row> 
);

ReactDOM.render(content, mountNode);
````
