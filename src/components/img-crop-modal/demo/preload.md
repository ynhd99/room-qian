---
order: 1
title:
  zh-CN: 预加载
  en-US: preload
---

## zh-CN

预加载图片，图片内容不可变

## en-US

preload pictures and open fast.

````jsx
import { ImgCropModal } from 'hermes-react';
import { Button, message } from 'antd';

const PicTrigger = React.createClass({
  getInitialState() {
    return {
      showCropView: false,
    }
  },

  cropPic(positionInfo) {
    message.success(`截取结果${JSON.stringify(positionInfo)}`);
    this.setState({showCropView: false});
  },

  render() {
    const {showCropView} = this.state;
    return (<div>
      <Button type="primary" onClick={() => {this.setState({showCropView: true})}}>裁剪图片</Button>
      <ImgCropModal
        visible={showCropView}
        url="https://zos.alipayobjects.com/rmsportal/DGEchaQyPzdwMvbqzzsk.jpg"
        modalOption={{
          onOk: this.cropPic,
          onCancel: () => {
            this.setState({showCropView: false});
          }
        }}
      />
    </div>);
  },
})

ReactDOM.render(<PicTrigger />, mountNode);
````
