---
order: 4
title:
  zh-CN: 可拖拽
  en-US: draggable
---

## zh-CN

拖拽改变行的排序。

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

    return (
      <Form>
        <FormItem>
          <AddableRow
            options={options}
            draggable
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
                console.log('AddableRow拖拽用法', v);
              },
            })}
          />
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
