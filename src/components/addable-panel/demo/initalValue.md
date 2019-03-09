---
order: 2
title:
  zh-CN: 初始化值回填
  en-US: initial value
---

## zh-CN

支持 antd/Form 提供的值回填。

## en-US

simple demo.

````jsx
import { AddablePanel } from 'hermes-react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const formOptions = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };

    const options = [{
      name: 'inputValue', // 字段名
      width: '8',
      formFieldProps: {
        rules: [{
          required: true,
          message: '此处必填',
        }],
      },
      render: (_, formProps) => {
        return (<FormItem
          label="输入框："
          {...formOptions} >
          <Input {...formProps}
            placeholder="请输入相关的描述" />
        </FormItem>);
      },
    }, {
      name: 'selectValue',
      width: '6',
      render: (_, formProps) => {
        return (<FormItem
          label="选择框："
          {...formOptions} >
          <Select {...formProps}
            placeholder="请选择"
            size="large"
            allowClear>
            <Option key="1">选项1</Option>
            <Option key="2">选项2</Option>
            <Option key="3">选项3</Option>
          </Select>
        </FormItem>)
      },
    }];

    // 支持校验需要传入form对象
    return (
      <Form>
        <FormItem>
          <AddablePanel options={options}
            copyable
            form={form}
            {...getFieldProps('addable-panel3', {
              initialValue: [{
                inputValue: '回填的值1',
                selectValue: '2',
              }, {
                inputValue: '回填的值2',
              }],
              onChange: (v) => {
                console.log('AddablePanel回填用法：', v);
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
