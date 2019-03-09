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
import { AddableRow } from 'hermes-react';
import { Form, DatePicker } from 'antd';

const FormItem = Form.Item;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const options = [{
      width: '1',
      render: (index) => {
        return <span>{index + 1}</span>;
      },
    }, {
      name: 'inputValue', // 字段名
      width: '8',
      render: (_, formProps) => {
        return (<FormItem>
          <DatePicker
            { ...formProps }
            style={{width: '90%'}}
            size="large" />
        </FormItem>);
      },
    }];

    return (
      <Form>
        <FormItem>
          <AddableRow
            options={options}
            {...getFieldProps('addable-row', {
              onChange: (v) => {
                console.log('AddableRow基础用法：', v);
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
