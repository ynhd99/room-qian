---
order: 0
title:
  zh-CN: 基本选择
  en-US: basic
---

## zh-CN

基础的多选图片示例。

## en-US

simple demo.

````jsx
import { ImgPickerModal } from 'hermes-react';
import { Button } from 'antd';

// document.domain = 'alipay.net';
const PhotoUploader = React.createClass({
  getInitialState() {
    this.update = null;
    return {
      showPhotoView: false,
    }
  },

  componentDidMount() {
    setTimeout(() => {
      const asyncData = this.getData(10);
      this.update(asyncData);
    }, 200);
  },

  hideModal() {
    this.setState({showPhotoView: false});
  },

  addFiles(files) {
    console.log(files);
    this.hideModal();
  },

  getData(num = 200) {
    const examplePics = ['http://zos.alipayobjects.com/rmsportal/KmbGeLULGnZfCIFRabuH.png', 'http://zos.alipayobjects.com/rmsportal/VqLgauWQkaPyIsjZrSHy.jpeg',
    'https://gw.alipayobjects.com/zos/rmsportal/OLSNFSycERsdqidvLtTh.jpg',
    'https://gw.alipayobjects.com/zos/rmsportal/zraeuQGxkWiKBJBZhTyj.jpg',
    'https://gw.alipayobjects.com/zos/rmsportal/dYgYRotzMxzvqoXMKoLY.jpg'];
    const pics = [];
    for(let i = 0; i < num; i++) {
      pics.push({id: i, thumbUrl: examplePics[parseInt(Math.random()*10/2)]});
    }
    return pics;
  },

  render() {
    const { showPhotoView } = this.state;

    return (<div>
      <Button type="primary" onClick={() => { this.setState({showPhotoView: true}); }}>选择图片</Button>
      <ImgPickerModal
        title="测试上传"
        limitInfo="一次最多可添加2个图片"
        notice="图片可以上传内景照（如包间、大厅、特色附加设施）或外景照（如店外有花园、临湖等特色环境）"
        visible={showPhotoView}
        max={5}
        min={1}
        fetch={(cb) => {
          this.update = cb;
        }}
        onOk={this.addFiles}
        onCancel={this.hideModal}
        onChange={(file) => { console.log(file); }}
      /></div>);
  },
})

ReactDOM.render(<PhotoUploader />, mountNode);
````
