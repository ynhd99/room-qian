---
order: 1
title:
  zh-CN: 带文案描述的图片
  en-US: image with text
---

## zh-CN

带文案描述的图片。

## en-US

image with text.

````jsx
import { ImgSliderModal } from 'hermes-react';

const imgList = [
  {
    src: 'https://zos.alipayobjects.com/rmsportal/KKWJobyiWdRibfv.jpg',
    alt: '图片1',
    desc: '这里是图片1的介绍',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/TnlRRBYPqdhRRzR.jpg',
    alt: '图片2',
    desc: '这里是图片2的介绍',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/bcwJzkNovuGIMEA.jpg',
    alt: '图片3',
    desc: '这里是图片3的介绍',
  }
];

ReactDOM.render(<ImgSliderModal list={imgList}>
  <a>查看图片</a>
</ImgSliderModal>, mountNode);
````
