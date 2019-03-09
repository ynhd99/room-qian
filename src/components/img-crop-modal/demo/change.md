---
order: 4
title:
  zh-CN: 拖动控制
  en-US: pic-limit
---

## zh-CN
1. dragMin及dragMax中的type最好一致
2. 没设置dragMin时，初始化值即为最小

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
          style={{width: 400}}
          initWidth={60}
          rate={120/220}
          dragMin={{type: 'height', value: 0.3}}
          dragMax={{type: 'height', value: 0.8}}
          onChange={(info) => {
            const {X, Y, width} = info;
            this.setState({x: X, y: Y, realWidth: width});
          }}
        />
      </div>
      <div style={{display: 'inline-block', verticalAlign: 'top', width: 120, height: 220, marginLeft: 30, position: 'relative', overflow: 'hidden'}}>
        <img src={url} style={{position: 'absolute', left: -x * rate, top: -y * rate, width: 400 * rate }} />
      </div>
    </div>
  }
}
ReactDOM.render(<PicCrop />, mountNode);
````
