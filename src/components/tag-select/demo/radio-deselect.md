---
order: 5
title:
  zh-CN: 可取消互斥单选
  en-US: radio mode with deselect
---

## zh-CN

标签互斥单选，可取消勾选

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
    deselect
    onChange={onChange}
  />
, mountNode);
````
