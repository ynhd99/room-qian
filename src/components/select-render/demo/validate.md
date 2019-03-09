---
order: 3
title:
  zh-CN: 校验表单
  en-US: validator
---

## zh-CN

把选择渲染区域作为整个表单项校验（推荐）。

**注意：使用FormItem校验功能请务必填上 `initialValue` 值，否则整体校验会因为value空而报错。**

## en-US

validating the whole rendering area as a form item.

````jsx
import { SelectRender } from 'hermes-react';
import { Form, InputNumber, Button } from 'antd';

const FormItem = Form.Item;

function isUndefined(value) {
  return typeof value === 'undefined';
}

let Demo = React.createClass({
  validator(rule, value, callback) {
    const EMPTY_ERR_MSG = new Error('此处必填');
    if (!value || isUndefined(value.type)) {
      callback(EMPTY_ERR_MSG);
      return;
    }

    if (value.type === 'fixed' && isUndefined(value.value)) {
      callback(EMPTY_ERR_MSG);
      return;
    }

    if (value.type === 'range') {
      if (isUndefined(value.min) || isUndefined(value.max)) {
        callback(EMPTY_ERR_MSG);
        return;
      }

      if (value.min > value.max) {
        callback(new Error('范围的最大值应大于最小值'));
        return;
      }
    }
    callback();
  },

  onSubmit() {
    this.props.form.validateFields((error, values) => {
      console.log('整体校验' + (error ? '不通过' : '通过'), error, values);
    });
  },

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
          label="选择即触发校验："
          labelCol={{span: 6}}
          wrapperCol={{span: 9}} >
          <SelectRender
            options={options}
            {...getFieldProps('common-render', {
              initialValue: { type: 'null' },
              onChange: (v) => {
                console.log('SelectRender基本三项选择的值：', v);
              },
              rules: [this.validator],
            })} />
        </FormItem>

        <FormItem
          wrapperCol={{span: 9, offset: 6}}
        >
          <Button onClick={this.onSubmit}>提交</Button>
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
