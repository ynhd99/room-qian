---
order: 2
title:
  zh-CN: AddableRow组合
  en-US: block
---

## zh-CN

换行渲染，与 AddableRow 组合使用。

## en-US

block style, use with AddableRow

````jsx
import { SelectRender, AddableRow } from 'hermes-react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

let Demo = React.createClass({
  render() {
    const { form } = this.props;
    const { getFieldProps } = this.props.form;

    const rowOptions = [{
      width: '1',
      render: (index) => {
        return <span>{index + 1}.</span>;
      },
    }, {
      name: 'inputValue', // 字段名
      width: '18',
      render: (_, formProps) => {
        return (
          <Input
            { ...formProps }
            placeholder="使用须知中请勿输入序号，系统会自动添加"
            style={{width: '98%', marginBottom: 18}}
            size="large" />
        );
      },
    }];


    const options = [{
      key: 'userDefine',
      name: '商家自定义',
      render: () => null,
    }, {
      key: 'fixed',
      name: '指定须知',
      display: 'block',
      render: (value, onValueChange) => {
        return (<div>
          <p className="ft-explain ft-mt8 ft-mb8">最多添加6条，每条不超过100字</p>
          <AddableRow max={6}
            options={rowOptions}
            value={value.value}
            onChange={(e) => onValueChange(e, 'value')} />
      </div>);
      },
    }];

    return (
      <Form>
        <FormItem
          label="使用须知："
          labelCol={{span: 6}}
          wrapperCol={{span: 12}} >
          <SelectRender
            options={options}
            {...getFieldProps('notice-render', {
              onChange: (v) => {
                console.log('SelectRender使用须知选择的值：', v);
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
