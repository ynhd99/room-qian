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
import { SearchInput } from 'hermes-react';

ReactDOM.render(
  <SearchInput
    onSearch={value => console.log(value)}
    style={{ width: 200 }}
  />
, mountNode);
````
