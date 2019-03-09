---
order: 3
title:
  zh-CN: 表单回填
  en-US: initial form
---

## zh-CN

支持 antd/Form 提供的值回填。

支持行复制。

## en-US

simple demo.

````jsx
import { AddableRow } from 'hermes-react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let Demo = React.createClass({
  onClick() {
    this.props.form.setFieldsValue({
      addable: [{
        inputValue: '回填的值1',
        selectValue: '2',
      }, {
        inputValue: '回填的值2',
        selectValue: '2',
      }, {
        inputValue: '回填的值3',
      }, {
        inputValue: '回填的值4',
      }],
    });
  },

  onClick2() {
    this.props.form.setFieldsValue({
      addable: [{
        inputValue: '回填的值2',
        selectValue: '2',
      }, {
        inputValue: '回填的值3',
      }],
    });
  },

  onClick3() {
    this.props.form.setFieldsValue({
      addable: undefined,
    });
  },

  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const options = [{
      name: 'inputValue', // 字段名
      width: '8',
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
      name: 'selectValue',
      width: '6',
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
              initialValue: [{
                inputValue: '回填的值1',
                selectValue: '1',
              }, {
                inputValue: '回填的值2',
                selectValue: '2',
              }, {
                inputValue: '回填的值3',
              }],
              onChange: (v) => {
                console.log('AddableRow校验用法：', v);
              },
            })}/>
        </FormItem>
        <Button onClick={this.onClick}>重新设置值-增多</Button>
        <Button className="fn-ml10" onClick={this.onClick2}>重新设置值-减少</Button>
        <Button className="fn-ml10" onClick={this.onClick3}>清空</Button>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(
  <Demo />
, mountNode);
````
