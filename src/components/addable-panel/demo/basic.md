---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

最简单的用法。

## en-US

simple demo.

````jsx
import { AddablePanel } from 'hermes-react';
import { Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const formOptions = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };

    const options = [{
      name: 'row1', // 字段名
      render: (_, formProps) => {
        return (<FormItem
          label="输入框："
          {...formOptions} >
          <Input placeholder="请输入"
            { ...formProps } />
        </FormItem>);
      },
    }, {
      name: 'row2', // 字段名
      render: (_, formProps) => {
        return (<FormItem
          label="日期选择："
          {...formOptions} >
          <DatePicker
            { ...formProps }
            style={{width: '100%'}}
            size="large" />
        </FormItem>);
      },
    }];

    return (
      <Form>
        <FormItem>
          <AddablePanel
            options={options}
            {...getFieldProps('addable-panel', {
              onChange: (v) => {
                console.log('AddablePanel基础用法：', v);
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
