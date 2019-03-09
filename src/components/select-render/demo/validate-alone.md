---
order: 4
title:
  zh-CN: 单独校验表单项
  en-US: validator-alone
---

## zh-CN

通过传入Form对象，单独校验渲染的表单项。

## en-US

validating the whole rendering area as a form item.

````jsx
import { SelectRender } from 'hermes-react';
import { Form, InputNumber, Row, Col } from 'antd';

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
        return (<FormItem>
          <InputNumber size="large"
            style={{width: '90%'}}
            min={0}
            {...getFieldProps('sr-value', {
              initialValue: value.value,
              onChange: (e) => onValueChange(e, 'value'),
              rules: [{
                required: true,
                type: 'number',
                message: '此处必填',
              }],
            })} />份
        </FormItem>);
      },
    }, {
      key: 'range',
      name: '范围区间',
      render: (value, onValueChange) => {
        return (<div>
          <FormItem className="fn-left" style={{width: '40%'}}>
            <InputNumber size="large"
              className="fn-mr0"
              style={{width: '100%'}}
              min={0}
              {...getFieldProps('sr-min', {
                initialValue: value.min,
                onChange: (e) => onValueChange(e, 'min'),
                rules: [{
                  required: true,
                  type: 'number',
                  message: '此处必填',
                }],
              })} />
          </FormItem>
          <span className="fn-left ft-bar">-</span>
          <FormItem className="fn-left" style={{width: '40%'}}>
            <InputNumber size="large"
              style={{width: '100%'}}
              min={1}
              max={999999999}
              {...getFieldProps('sr-max', {
                initialValue: value.max,
                onChange: (e) => onValueChange(e, 'max'),
                rules: [{
                  required: true,
                  type: 'number',
                  message: '此处必填',
                }],
              })} />
          </FormItem><span className="fn-left fn-ml8">份</span>
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
            onChange={(v) => {
              console.log('SelectRender单独校验表单项值：', v)
            }} />
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
