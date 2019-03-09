---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

基本的用法

## en-US

simple demo

````jsx
import { TagSelect } from 'hermes-react';

const onChange = (value, e) => {
  console.log(value);
};

ReactDOM.render(
  <TagSelect
    options={['停车位', '无烟区', 'Wi-Fi', '包厢', '旅拍']}
    onChange={onChange}
  />
, mountNode);
````
