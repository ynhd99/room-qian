---
order: 1
title:
  zh-CN: 选择搜索
  en-US: select
---

## zh-CN

支持补全选择的搜索输入框

## en-US

select search input

````jsx
import { SearchInput } from 'hermes-react';
import jsonp from 'jsonp';
import querystring from 'querystring';

function fetchData(value, callback) {
  const str = querystring.encode({
    code: 'utf-8',
    q: value,
  });
  jsonp(`https://suggest.taobao.com/sug?${str}`, (err, d) => {
    const result = d.result;
    const data = [];
    result.forEach((r) => {
      data.push({
        key: r[0],
        value: r[0],
      });
    });
    callback(value, data);
  });
}

ReactDOM.render(
  <SearchInput
    placeholder="请输入关键字"
    fetchData={fetchData}
    onSearch={value => console.log(value)}
    style={{ width: 200 }}
  />
, mountNode);
````
