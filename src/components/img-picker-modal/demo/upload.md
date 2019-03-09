---
order: 1
title:
  zh-CN: 上传并选择
  en-US: upload
---

## zh-CN

上传示例，使用文档详见[API](#上传部分属性)

## en-US

simple demo.

````jsx
import { ImgPickerModal } from 'hermes-react';
import { Button, message } from 'antd';

// document.domain = 'alipay.net';
const PhotoUploader = React.createClass({
  getInitialState() {
    this.id = 3;
    return {
      showPhotoView: false,
    }
  },

  hideModal() {
    this.setState({showPhotoView: false});
  },

  addFiles(files) {
    console.log(files);
    this.hideModal();
  },

  beforeUpload(file) {
    console.log({file});
    return new Promise((resolve, reject) => {
      if (file.size < 100 * 1024 || file.size > 2 * 1024 * 1024) { // 小于100kb大于2m
        message.error("图片不符合要求");
        reject("图片不符合要求");
      } else {
        resolve();
      }
    });
  },

  getData(num = 200) {
    const examplePics = ['http://zos.alipayobjects.com/rmsportal/KmbGeLULGnZfCIFRabuH.png', 'http://zos.alipayobjects.com/rmsportal/VqLgauWQkaPyIsjZrSHy.jpeg',
    'https://gw.alipayobjects.com/zos/rmsportal/OLSNFSycERsdqidvLtTh.jpg',
    'https://gw.alipayobjects.com/zos/rmsportal/zraeuQGxkWiKBJBZhTyj.jpg',
    'https://gw.alipayobjects.com/zos/rmsportal/dYgYRotzMxzvqoXMKoLY.jpg'];
    const pics = [];
    for(let i = 0; i < num; i++) { // 必须要保证每页id唯一
      pics.push({id: Date.now() + i, thumbUrl: examplePics[parseInt(Math.random()*10/2)]});
    }
    return pics;
  },

  render() {
    const { showPhotoView } = this.state;
    const listData = this.getData(40);

    return (<div>
      <Button type="primary" onClick={() => { this.setState({showPhotoView: true}); }}>选择图片</Button>
      <ImgPickerModal
        title="测试2上传"
        visible={showPhotoView}
        multiple={false}
        max={2}
        min={1}
        fetch={(cb) => {
          setTimeout(() => {
            cb(listData);
          }, 500);
        }}
        chooseUpload
        uploadUrl="./upload.do"
        beforeUpload={(file) => { return this.beforeUpload(file); }}
        uploadChange={(file) => { console.log('change', file); return  {success: true, data: {id: this.id++, thumbUrl: 'https://zos.alipayobjects.com/rmsportal/CTpVbbrZlZMPEgHmdIAo.png'}}}}
        onOk={this.addFiles}
        onCancel={this.hideModal}
      /></div>);
  },
})

ReactDOM.render(<PhotoUploader />, mountNode);
````
