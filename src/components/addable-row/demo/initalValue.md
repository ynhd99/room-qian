---
order: 2
title:
  zh-CN: 设置初始值
  en-US: initial value
---

## zh-CN

通过配置options中的`formFieldProps.initialValue`，为某一列设置初始值

## en-US

simple demo.

````jsx
import { AddableRow } from 'hermes-react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const options = [{
      name: 'inputValue', // 字段名
      width: '8',
      formFieldProps: {
        initialValue: '初始值，可以重新填写'
      },
      render: (_, formProps) => {
        return (<FormItem>
          <Input {...formProps}
            style={{width: '90%'}}
            placeholder="请输入相关的描述" />
        </FormItem>);
      },
    }, {
      name: 'selectValue',
      width: '6',
      formFieldProps: {
        initialValue: '1',
      },
      render: (_, formProps) => {
        return (<Select {...formProps}
          placeholder="请选择"
          size="large"
          style={{width: '90%'}}
          allowClear>
          <Option key="1">选项1</Option>
          <Option key="2">选项2</Option>
          <Option key="3">选项3</Option>
        </Select>)
      },
    }];

    // 支持校验需要传入form对象
    return (
      <Form>
        <FormItem>
          <AddableRow options={options}
            copyable
            form={form}
            {...getFieldProps('addable', {
              onChange: (v) => {
                console.log('AddableRow校验用法：', v);
              },
            })}/>
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
