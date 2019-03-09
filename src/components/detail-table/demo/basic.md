---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

基本用法。自适应排版。

## en-US

Basic usage. Adaptive layout.

```jsx
import { DetailTable } from 'hermes-react';
import { Button } from 'antd';

const NARROW = 3;
const WIDE = 5;

class Demo extends React.Component {
  state = {
    skipBrandName: false,
    cityColSpan: NARROW,
  };

  voucherData = {
    voucherName: '美食广场30元全场代金券',
    voucherLogo: 'https://zos.alipayobjects.com/cmsmng/cms/images/j0zgr3r7/8fe3c7c8-ad03-4ece-b21c-6bec4a2881c9.png',
    voucherBrandName: '美食广场',
    categories: '中餐,美食',
    city: '上海市,合肥市,北京市,杭州市,天津市,深圳市,南京市,广州市,宁波市',
  };

  render() {
    const { voucherName, voucherLogo, voucherBrandName, categories, city, voucherType } = this.voucherData;
    const { skipBrandName, cityColSpan } = this.state;
    const dataSource = [
      {
        label: '劵名称',
        value: voucherName,
      },
      {
        label: '券LOGO',
        value: <img src={voucherLogo} style={{ maxHeight: 100, maxWidth: 100 }} />,
      },
      {
        label: '券适用品牌',
        value: voucherBrandName,
        isSkipped: skipBrandName,
      },
      {
        label: '所属类目',
        value: categories,
      },
      {
        label: '适用城市',
        value: city,
        colSpan: cityColSpan,
      },
    ];
    return (
      <div className="components-search">
        <DetailTable dataSource={dataSource} columnCount={6} />
        <p style={{ marginTop: 10 }}>
          <Button onClick={() => this.setState({ skipBrandName: !skipBrandName })}>{skipBrandName ? '显示字段' : '隐藏字段'}</Button>
          <Button style={{ marginLeft: 10 }} onClick={() => this.setState({ cityColSpan: NARROW + WIDE - cityColSpan })}>
            {cityColSpan === NARROW ? '扩展列宽' : '收窄列宽'}
          </Button>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
