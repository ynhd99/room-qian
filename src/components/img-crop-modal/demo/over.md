---
order: 5
title:
  zh-CN: 拖动超出
  en-US: pic-limit
---

## zh-CN
 over 是否裁剪图片留白区域
 裁剪图片真实区域在onChange时会多传一个valid字段, 详见图片预览部分。

## en-US


````jsx
import { ImgCropModal } from 'hermes-react';
import { Button, message } from 'antd';

const url = "https://zos.alipayobjects.com/rmsportal/DGEchaQyPzdwMvbqzzsk.jpg";
class PicCrop extends React.Component {
  state = {
    realWidth: 322,
    x: 0,
    y: 0
  }

  render() {
    const {x, y, realWidth} = this.state;
    const rate = 120 / realWidth;
    return <div>
      <div style={{display: 'inline-block'}}>
        <ImgCropModal
          url={url}
          isModal={false}
          style={{width: 400, height: 500}}
          initWidth={60}
          rate={120/220}
          over
          onChange={(info) => {
            const {X, Y, width} = info;
            this.setState({x: X, y: Y, realWidth: width});
      }} />
      </div>
      <div style={{display: 'inline-block', verticalAlign: 'top', width: 120, height: 220, marginLeft: 30, background: '#fff', border: '1px solid #ddd', position: 'relative', overflow: 'hidden'}}>
        <img src={url} style={{position: 'absolute', left: -x * rate, top: -y * rate, width: 400 * rate }} />
      </div>
    </div>
  }
}
ReactDOM.render(<PicCrop />, mountNode);
````
