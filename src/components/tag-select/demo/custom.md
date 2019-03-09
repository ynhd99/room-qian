---
order: 1
title:
  zh-CN: 自定义
  en-US: custom
---

## zh-CN

自定义标签value值以及禁选状态，该模式下兼容Checkbox.Group

## en-US

custom value and disabled

````jsx
import { TagSelect } from 'hermes-react';

const options = [{
  'label': '停车位',
  'value': 'park',
}, {
  'label': '无烟区',
  'value': 'nosmoking',
}, {
  'label': 'Wi-Fi',
  'value': 'wifi',
}, {
  'label': '包厢',
  'value': 'room',
}, {
  'label': '旅拍',
  'value': 'dv',
  'disabled': true,
}];

const onChange = (value, obj) => {
  console.log(value, obj);
};

ReactDOM.render(
  <TagSelect
    options={options}
    onChange={onChange}
  />
, mountNode);
````
