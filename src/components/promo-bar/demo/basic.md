---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic
---

## zh-CN

标准公告基本用法
标准的PromoBar，横向滚动

## en-US

simple demo

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

ReactDOM.render(<PromoBar dataSource={data} />, mountNode);
````
