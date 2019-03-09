---
order: 2
title:
  zh-CN: 自定义公告格式
  en-US: custom
---

## zh-CN

自定义公告格式

## en-US

custom

````jsx
import { PromoBar } from 'hermes-react';

const data = [{
  'custom': '公告：双十一开始啦！',
}, {
  'custom': <strong style={{color:'blue'}}>公告：双十二开始啦！</strong>,
}];

ReactDOM.render(<PromoBar dataSource={data} speed={80} closable={false} />, mountNode);
````
