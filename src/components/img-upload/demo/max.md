---
order: 2
title:
  zh-CN: 上传限制
  en-US: limit max
---

## zh-CN

限制上传图片数量。

限制上传图片的大小。

限制上传文件后缀。

## en-US

simple demo.

````jsx
import { ImgUpload } from 'hermes-react';

const props = {
  max: 2,
  exampleUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  action: '/upload.do',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  }]
};

ReactDOM.render(
  <ImgUpload {...props} />
, mountNode);
````
