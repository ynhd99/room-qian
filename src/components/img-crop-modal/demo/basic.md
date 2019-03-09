---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

截取时将位置信息传给服务端

## en-US

simple demo.

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
      {showCropView ? <ImgCropModal
      initWidth={200}
      rate={1.5}
      dragMin={{type: 'width', value: 80}}
      dragMax={{type: 'width', value: 350}}
      url="https://zos.alipayobjects.com/rmsportal/DGEchaQyPzdwMvbqzzsk.jpg"
      modalOption={{
        onOk: this.cropPic,
        onCancel: () => {
          this.setState({showCropView: false});
        }
      }}
      /> : null}
    </div>);
  },
})

ReactDOM.render(<PicTrigger />, mountNode);
````
