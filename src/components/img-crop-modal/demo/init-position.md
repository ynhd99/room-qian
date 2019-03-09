---
order: 6
title:
  zh-CN: 回填
  en-US: pic-limit
---

## zh-CN
初始化回填值


````jsx
import { ImgCropModal } from 'hermes-react';
import { Button, message } from 'antd';

class PicCrop extends React.Component {
  render() {
    return <ImgCropModal url='https://zos.alipayobjects.com/rmsportal/DGEchaQyPzdwMvbqzzsk.jpg' isModal={false} style={{width: 500}} init={{X: 30, Y: 50, width: 500, height: 230}} />
  }
}
ReactDOM.render(<PicCrop />, mountNode);
````
