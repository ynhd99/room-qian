---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

基本的用法。

## en-US

simple demo.

````jsx
import { InfoModal } from 'hermes-react';

const dom = (
  <InfoModal
    className="fn-ml8"
    trigger="查看图片"
    width={632}
    title="内容标题"
  >
    <div className="ft-center">
      <img
        width="200"
        src="https://zos.alipayobjects.com/rmsportal/PhxROoRYBVtKcOcbJhGH.png"
      />
      <div>文字信息，可以填写任意元素和内容</div>
    </div>
  </InfoModal>
);

ReactDOM.render(dom, mountNode);
````
