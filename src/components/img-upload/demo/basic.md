---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

最简单的用法。

## en-US

simple demo.

````jsx
import { ImgUpload } from 'hermes-react';

const props = {
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
