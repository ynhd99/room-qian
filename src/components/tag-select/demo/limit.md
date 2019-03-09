---
order: 2
title:
  zh-CN: 选择限制
  en-US: limit
---

## zh-CN

默认值及选择限制

## en-US

default value & limit

````jsx
import { TagSelect } from 'hermes-react';

const onChange = (value, e) => {
  console.log(value);
};

ReactDOM.render(
  <TagSelect
    options={['停车位', '无烟区', 'Wi-Fi', '包厢', '旅拍']}
    limit={3}
    defaultValue={['Wi-Fi', '包厢']}
    onChange={onChange}
  />
, mountNode);
````
