---
order: 1
title:
  zh-CN: 表单校验
  en-US: rules
---

## zh-CN

通过传入Form对象，单独校验渲染的表单项。

通过配置options中的`formFieldProps`，让表单元素支持 react-component/form 提供的校验。

限制最多添加3项。

## en-US

simple demo.

````jsx
import { AddablePanel } from 'hermes-react';
import { Form, Input, Checkbox } from 'antd';

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
      formFieldProps: {
        normalize: (v, prev) => {
          if (v !== prev) {
            console.log('AddablePanel 配置formFieldProps支持 normalize：', v, prev);
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
          label="多选框："
          {...formOptions} >
          <Checkbox { ...formProps }>是否选择</Checkbox>
        </FormItem>);
      },
    }];

    // 支持校验需要传入form对象
    return (
      <Form>
        <p style={{ fontSize: 12, margin: '0 0 10px 20px' }}>最多添加3个，输入框最多每个输入10个字</p>
        <FormItem>
          <AddablePanel options={options}
            form={form}
            max={3}
            {...getFieldProps('addable-panel2', {
              onChange: (v) => {
                console.log('AddablePanel校验用法：', v);
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
