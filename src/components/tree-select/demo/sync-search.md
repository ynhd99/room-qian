---
order: 1
title:
  zh-CN: 同步树搜索
  en-US: SyncTree Search
---

## zh-CN

固定数据支持本地搜索

## en-US

basic demo.

```jsx
import { TreeSelect } from 'hermes-react';
import { Row, Col, Input, Button } from 'antd';
import cities from './cities.jsx'; // 载入城市数据

const loop = (data)=> {
  data.forEach((item)=> {
    const {c, i, n} = item;
    item.children = c;
    item.id = i;
    item.name = n;
    if (c) {
      loop(c);
    }
  });
};
loop(cities);

class TreeDemo extends React.Component {
  componentWillMount() {
    this.setState({
      searchValue: null,
    });
  }

  search(searchValue, item) {
    return item.model.name.indexOf(searchValue) != -1;
  }

  onChange(ids, model) {
    console.log('SyncTree Search:', ids, model);
  }

  onInputChange(e) {
    const searchValue = e.target.value;
    if (searchValue.trim() === '') {
      this.setState({
        searchValue,
      });
    } else {
      this.searchValue = searchValue;
    }
  }

  onSearch() {
    this.setState({
      searchValue: this.searchValue,
    });
  }

  render() {
    return (
      <div>
        <Row style={{marginBottom:20}}>
          <Col span="8"><Input onChange={this.onInputChange.bind(this)} /></Col>
          <Col span="4"><Button style={{marginLeft:20}} onClick={this.onSearch.bind(this)}>搜索</Button></Col>
        </Row>
        <TreeSelect
          checked={['340822', '340826']}
          disabled={['340822', '340826']}
          treeData={ cities }
          defaultExpandLevel={2}
          onChange={this.onChange.bind(this) }
          searchValue={this.state.searchValue}
          search={ this.search.bind(this) }
        />
      </div>
    );
  }
}

ReactDOM.render(<TreeDemo />, mountNode);
```

