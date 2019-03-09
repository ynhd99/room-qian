---
order: 1
title:
  zh-CN: 垂直滚动
  en-US: vertical
---

## zh-CN

垂直滚动公告

## en-US

vertical scroll

````jsx
import { PromoBar } from 'hermes-react';

const data = [{
  'name': '公告',
  'content': '双十一开始啦！',
  'link': 'https://www.tmall.com/',
}, {
  'name': '公告',
  'content': '双十一结束啦！',
}, {
  'name': '公告',
  'content': '双十二开始啦！',
  'link': 'https://www.koubei.com/',
}, {
  'name': '公告',
  'content': '双十二结束啦！',
}];

ReactDOM.render(<PromoBar dataSource={data} vertical duration={3} />, mountNode);
````
