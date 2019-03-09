---
order: 3
title:
  zh-CN: 表单联动
  en-US: related item
---

## zh-CN

一行内的表单联动，不选择选择框不能输入。

一列内的表单联动，选择过的选项不能重复选择。

## en-US

simple demo.

````jsx
import { AddableRowTable } from 'hermes-react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let Demo = React.createClass({
  getInitialState() {
    return {
      options: [{
        code: 'ONE',
        label: '不可重复的选项1',
      }, {
        code: 'TWO',
        label: '不可重复的选项2',
      }, {
        code: 'THREE',
        label: '不可重复的选项3',
      }],
    };
  },

  componentWillMount() {
    this.switchOtionsDisabled('TWO', true);
  },

  switchOtionsDisabled(code, disabled) {
    const { options } = this.state;
    options.forEach(it => {
      if (it.code === code) {
        it.disabled = disabled;
      }
    });
    this.setState({ options });
  },

  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const selects = this.state.options.map(it => {
      return <Option key={it.code} disabled={it.disabled}>{it.label}</Option>;
    });

    const options = [{
      title: '选择框',
      name: 'selectValue',
      width: '10',
      formFieldProps: {
        normalize: (v, prev) => {
          if (v !== prev) {
            this.switchOtionsDisabled(prev, false);
            this.switchOtionsDisabled(v, true);
          }
          return v;
        },
      },
      render: (_, formProps) => {
        return (<Select {...formProps}
          placeholder="请选择"
          size="large"
          style={{width: '90%'}}
          allowClear>
          { selects }
        </Select>)
      },
    }, {
      title: '输入框',
      name: 'inputValue', // 字段名
      width: '10',
      render: (key, formProps) => {
        const row = this.props.form.getFieldValue('addable-row-table4')[key];
        const disabled = typeof row.selectValue === 'undefined';

        return (<FormItem>
          <Input {...formProps}
            disabled={disabled}
            style={{width: '90%'}}
            placeholder="请输入相关的描述" />
        </FormItem>);
      },
    }];

    // 配置formFieldProps需要传入form对象
    return (
      <Form>
        <FormItem>
          <AddableRowTable options={options}
            copyable
            form={form}
            {...getFieldProps('addable-row-table4', {
              initialValue: [{
                inputValue: '回填的值1',
                selectValue: 'TWO',
              }, {}],
              onChange: (v) => {
                console.log('AddableRowTable联动用法：', v);
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
