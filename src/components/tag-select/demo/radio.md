---
order: 4
title:
  zh-CN: 互斥单选
  en-US: radio mode
---

## zh-CN

标签互斥单选，类似Radio组件

## en-US

single select with mutex

````jsx
import { TagSelect } from 'hermes-react';
const RadioSelect = TagSelect.RadioSelect;

const onChange = (value, e) => {
  console.log(value);
};

ReactDOM.render(
  <RadioSelect
    options={['停车位', '无烟区', 'Wi-Fi', '包厢', '旅拍']}
    defaultValue={['停车位']}
    onChange={onChange}
  />
, mountNode);
````
