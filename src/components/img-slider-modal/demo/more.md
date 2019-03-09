---
order: 2
title:
  zh-CN: 更多用法
  en-US: more
---

## zh-CN

自定义宽高，有限循环轮播，不显示面板指示点

## en-US

custom params.

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

ReactDOM.render(<ImgSliderModal
  list={imgList}
  width={720}
  height={450}
  infinite={false}
  dots={false}
>
  <a>3张图片</a>
</ImgSliderModal>, mountNode);
````
