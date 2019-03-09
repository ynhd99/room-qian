---
order: 3
title:
  zh-CN: 自定义选择限制
  en-US: custom limit
---

## zh-CN

自定义选择限制提示

## en-US

custom limit

````jsx
import { Form, Icon } from 'antd';
import { TagSelect } from 'hermes-react';

const FormItem = Form.Item;

let Demo = React.createClass({
  getInitialState() {
    return {
      showExtra: false,
    };
  },
  onChange(value) {
    console.log(value);
    if (value.length < 2) {
      this.setState({ showExtra: false });
    }
  },
  onExceedLimit() {
    this.setState({ showExtra: true });
  },
  render() {
    const extra = this.state.showExtra ? <p>
      <Icon style={{color: '#fa0'}} type="info-circle" />
      &nbsp;最多选择2个标签，已达到上限。
    </p> : '';
    return (<Form>
      <FormItem
        label="标签选择"
        labelCol={{ span: '6' }}
        wrapperCol={{ span: '18' }}
        extra={extra}
      >
        <TagSelect
          {...this.props.form.getFieldProps('tags', {
            onChange: this.onChange,
          })}
          options={['停车位', '无烟区', 'Wi-Fi', '包厢', '旅拍']}
          limit={2}
          limitedDisable={false}
          onLimitExceeded={this.onExceedLimit}
        />
      </FormItem>
    </Form>);
  }
});

Demo = Form.create()(Demo);

ReactDOM.render(
  <Demo />
, mountNode);
````
