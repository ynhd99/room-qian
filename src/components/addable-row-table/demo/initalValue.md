---
order: 2
title:
  zh-CN: 初始化值回填
  en-US: initial value
---

## zh-CN

支持 antd/Form 提供的值回填。

支持行复制。

## en-US

simple demo.

````jsx
import { AddableRowTable } from 'hermes-react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const options = [{
      title: '输入框',
      name: 'inputValue', // 字段名
      width: '10',
      formFieldProps: {
        rules: [{
          required: true,
          message: '此处必填',
        }, {
          max: 10,
          message: '最多输入10个字',
        }],
      },
      render: (_, formProps) => {
        return (<FormItem>
          <Input {...formProps}
            style={{width: '90%'}}
            placeholder="请输入相关的描述" />
        </FormItem>);
      },
    }, {
      title: '选择框',
      name: 'selectValue',
      width: '10',
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
          <AddableRowTable options={options}
            copyable
            form={form}
            {...getFieldProps('addable-row', {
              initialValue: [{
                inputValue: '回填的值1',
                selectValue: '2',
              }, {
                inputValue: '回填的值2',
              }],
              onChange: (v) => {
                console.log('AddableRowTable初始化回填用法：', v);
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
