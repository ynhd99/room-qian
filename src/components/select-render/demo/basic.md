---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

基本用法。

## en-US

simple demo.

````jsx
import { SelectRender } from 'hermes-react';

let Demo = React.createClass({
  render() {
    const options = [{
      key: 'first',
      name: '第一项',
      render: () => '选择了第一项',
    }, {
      key: 'second',
      name: '第二项',
      render: () => '选择了第二项',
    }, {
      key: 'third',
      name: '第三项',
      render: () => '选择了第三项',
    }];

    return (
      <SelectRender
        options={options}
        onChange={(v) => {
          console.log('SelectRender基础用法：', v);
        }} />
    );
  },
});

ReactDOM.render(
  <Demo />
, mountNode);
````
