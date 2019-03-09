---
order: 3
title:
  zh-CN: 可拖拽的面板
  en-US: draggable panels
---

## zh-CN

拖拽面板改变表单值的排序。

## en-US

draggable panels.

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
      name: 'inputValue', // 字段名
      render: (_, formProps) => {
        return (<FormItem
          label="输入框："
          {...formOptions} >
          <Input placeholder="请输入"
            { ...formProps } />
        </FormItem>);
      },
    }, {
      name: 'dateValue', // 字段名
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
            draggable
            options={options}
            {...getFieldProps('addable-panel', {
              initialValue: [{
                inputValue: '行1',
              }, {
                inputValue: '行2',
              }, {
                inputValue: '行3',
              }],
              onChange: (v) => {
                console.log('AddablePanel拖拽用法：', v);
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
