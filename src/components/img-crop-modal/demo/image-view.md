---
order: 6
title:
  zh-CN: 图片预览
  en-US: image-view
---

## zh-CN
将获取的值返填入preview。
1. fillType以一边的长为基准，auto时将以长的边为基准。
2. center基准边意外的边是否相对预览框居中显示。

## en-US

simple demo.

````jsx
import { ImgCropModal } from 'hermes-react';
import { Button, message } from 'antd';

const Preview = ImgCropModal.Preview;

const url = 'https://zos.alipayobjects.com/rmsportal/DGEchaQyPzdwMvbqzzsk.jpg';

class PicCrop extends React.Component {
  state = {
    positionInfo: null,
  }

  render() {
    const { positionInfo } = this.state;
    return (<div>
      <div style={{display: 'inline-block', verticalAlign: 'top'}}>
        <ImgCropModal
          url={url}
          isModal={false}
          style={{width: 400, height: 500}}
          initWidth={0.8}
          rate={4/3}
          over
          onChange={(info) => {
            this.setState({positionInfo: info.valid});
      }} />
      </div>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div>预览图1.</div>
        <Preview
          url={url}
          fillType="short"
          picStyle={{borderRadius: '100%', border: '1px solid #ddd', overflow: 'hidden'}}
          style={{width: 200, height: 200, background: '#888',marginBottom: 20}}
          crop={positionInfo}
        />
        <div>预览图2.</div>
        <Preview
          url={url}
          fillType="height"
          style={{width: 400, height: 200, background: '#888'}}
          crop={positionInfo}
        />
      </div>
    </div> );
  }
};

ReactDOM.render(<PicCrop />, mountNode);
````
