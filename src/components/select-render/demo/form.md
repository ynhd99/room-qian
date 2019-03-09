---
order: 1
title:
  zh-CN: 表单组合
  en-US: form
---

## zh-CN

常用的三项选择表单。

## en-US

commonly three select options.

````jsx
import { SelectRender } from 'hermes-react';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const options = [{
      key: 'userDefine',
      name: '商家自定义',
      render: () => null,
    }, {
      key: 'fixed',
      name: '固定数值',
      render: (value, onValueChange) => {
        return (<div>
          <InputNumber size="large"
            style={{width: '90%'}}
            min={0}
            value={value.value}
            onChange={(e) => onValueChange(e, 'value')} />份
        </div>);
      },
    }, {
      key: 'range',
      name: '范围区间',
      render: (value, onValueChange) => {
        return (<div>
          <InputNumber size="large"
            className="fn-mr0"
            style={{width: '40%'}}
            min={0}
            value={value.min}
            onChange={(e) => onValueChange(e, 'min')} />
          <span className="ft-bar">-</span>
          <InputNumber size="large"
            style={{width: '40%'}}
            min={1}
            max={999999999}
            value={value.max}
            onChange={(e) => onValueChange(e, 'max')} />份
        </div>);
      },
    }];

    return (
      <Form>
        <FormItem
          label="购买数量："
          labelCol={{span: 6}}
          wrapperCol={{span: 9}} >
          <SelectRender
            options={options}
            {...getFieldProps('common-render', {
              onChange: (v) => {
                console.log('SelectRender基本三项选择的值：', v);
              },
            })} />
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(
  <Demo />
, mountNode);
````
