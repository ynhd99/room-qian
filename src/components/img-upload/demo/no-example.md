---
order: 1
title:
  zh-CN: 不需要示例图
  en-US: no example
---

## zh-CN

不需要示例图，为触发点配置文案。

## en-US

simple demo.

````jsx
import { ImgUpload } from 'hermes-react';

const props = {
  triggerText: '证件上传',
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
