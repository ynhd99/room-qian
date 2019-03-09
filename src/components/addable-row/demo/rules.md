---
order: 1
title:
  zh-CN: 表单校验
  en-US: rules
---

## zh-CN

通过配置options中的`formFieldProps`，让表单元素支持 react-component/form 提供的校验。

限制最多添加3项。

## en-US

simple demo.

````jsx
import { AddableRow } from 'hermes-react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const options = [{
      name: 'inputValue', // 字段名
      title: '输入框',
      width: '8',
      formFieldProps: {
        normalize: (v, prev) => {
          if (v !== prev) {
            console.log('AddableRow 配置formFieldProps支持 normalize：', v, prev);
          }
          return v;
        },
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
    }];

    // 支持校验需要传入form对象
    return (
      <Form>
        <FormItem label="校验每一行不超过10个字">
          <AddableRow options={options}
            form={form}
            max={3}
            {...getFieldProps('addable-row', {
              onChange: (v) => {
                console.log('AddableRow初始化回填用法：', v);
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
