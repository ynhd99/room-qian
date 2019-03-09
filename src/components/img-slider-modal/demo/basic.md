---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

基本的用法。

## en-US

simple demo.

````jsx
import { ImgSliderModal } from 'hermes-react';

const imgList = [
  'https://zos.alipayobjects.com/rmsportal/KKWJobyiWdRibfv.jpg',
  'https://zos.alipayobjects.com/rmsportal/TnlRRBYPqdhRRzR.jpg',
  'https://zos.alipayobjects.com/rmsportal/bcwJzkNovuGIMEA.jpg',
];

ReactDOM.render(<ImgSliderModal list={imgList}>
  <a>查看图片</a>
</ImgSliderModal>, mountNode);
````
