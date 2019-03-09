---
order: 1
title:
  zh-CN: 触发元素自定义
  en-US: custom trigger
---

## zh-CN

自定义点击的触发元素。

## en-US

simple demo.

````jsx
import { InfoModal } from 'hermes-react';
import { Button } from 'antd';

const dom = (
  <InfoModal
    className="fn-ml8"
    trigger={<Button type="primary">按钮</Button>}
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
