---
order: 2
title:
  zh-CN: 框初始化
  en-US: pic-limit
---

## zh-CN
1. 权重：initWidth + rate > initHeight + rate > initWidth + initHeight
2. rate必须搭配initWidth或initHeight使用

## en-US


````jsx
import { ImgCropModal } from 'hermes-react';
import { Button, message } from 'antd';

class PicCrop extends React.Component {
  render() {
    return <ImgCropModal url='https://zos.alipayobjects.com/rmsportal/DGEchaQyPzdwMvbqzzsk.jpg' isModal={false} style={{width: 500}} initWidth={0.6} rate={1.5}/>
  }
}
ReactDOM.render(<PicCrop />, mountNode);
````
