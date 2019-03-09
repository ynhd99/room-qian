---
order: 2
title:
  zh-CN: 异步树
  en-US: AsyncTree
---

## zh-CN

异步树带搜索

## en-US

AsyncTree With Search

```jsx
import {Row, Col, Input, Button} from 'antd';
import { TreeSelect } from 'hermes-react';

const AsyncTree = TreeSelect.AsyncTree;

const twoLevelAsync = {
  id: '#',
  name: 'node-#',
  count: 2,
  children: [
    {
      id: '0',
      name: 'node-0',
      count: 4,
    },
    {
      id: '1',
      name: 'node-1',
      count: 3,
    },
  ]
};

const part0 = [
  {
    id: '01',
    name: 'node-01'
  },
  {
    id: '02',
    name: 'node-02'
  },
  {
    id: '03',
    name: 'node-03'
  },
  {
    id: '04',
    name: 'node-04'
  }
];

const treeData = [
  {
    id: '0',
    name: 'node-0',
    count: 1,
    children: [
      {
        id: '01',
        name: 'node-01'
      },
      {
        id: '02',
        name: 'node-02'
      },
      {
        id: '03',
        name: 'node-03'
      },
      {
        id: '04',
        name: 'node-04'
      },
    ]
  }
];


const part1 = [
  {
    id: '11',
    name: 'node-11'
  },
  {
    id: '12',
    name: 'node-12'
  },
  {
    id: '13',
    name: 'node-13'
  },
];

const searchData = {
  id: '#',
  name: 'node-#',
  count: 1,
  children: [
    {
      id: '0',
      name: 'node-0',
      count: 2,
    }
  ]
};

const searchPart0 = [
  {
    id: '01',
    name: 'node-01'
  },
  {
    id: '03',
    name: 'node-03'
  },
];


class TreeDemo extends React.Component {
  componentWillMount() {
    this.setState({
      searchValue: null,
    });
  }

  fetch(node, searchValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!searchValue) {
          if (node.id === '#') {
            resolve(((twoLevelAsync.children)))
          } else if (node.id === '0') {
            resolve(((part0)))
          } else if (node.id === '1') {
            resolve((part1));
          }
        } else {
          if (node.id === '#') {
            resolve((searchData.children))
          } else if (node.id === '0') {
            resolve((searchPart0))
          }
        }
      }, Math.random() * 2000)
    });
  }

  onChange(ids, model) {
    console.log(model);
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
        <AsyncTree
          treeData={treeData}
          checked={['01','02','03','04']}
          disabled={['02']}
          fetch={this.fetch.bind(this)}
          searchValue={this.state.searchValue}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<TreeDemo />, mountNode);
```
