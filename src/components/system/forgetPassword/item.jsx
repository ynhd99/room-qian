import React from 'react';
import { Form, Input, Button, Row } from 'antd';
import styles from '../../../common/register.less';

const FormItem = Form.Item;
const Item = ({
  home,
  form: { getFieldDecorator, getFieldValue, validateFields },
  onSubmitInfo,
}) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const checkConfirm = (rule, value, callback) => {
    if (value && value !== getFieldValue('newUserPass')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onSubmitInfo(values);
      }
    });
  };
  return (
    <div className={styles.main}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormItem hasFeedback label="账号" {...formItemLayout}>
            <Input
              value={home.userInfo.code}
              style={{ width: '90%' }}
              placeholder="请输入账号"
              disabled
            />
          </FormItem>
        </Row>
        <FormItem label="原来密码" {...formItemLayout}>
          {getFieldDecorator('oldUserPass', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入原来的密码',
              },
              {
                pattern: /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
            ],
          })(<Input type="password" placeholder="请输入原来的密码" style={{ width: '90%' }} />)}
        </FormItem>
        <FormItem label="新密码" {...formItemLayout}>
          {getFieldDecorator('newUserPass', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入新的密码',
              },
              {
                pattern: /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
            ],
          })(<Input type="password" placeholder="请输入新的密码" style={{ width: '90%' }} />)}
        </FormItem>
        <FormItem label="重复密码" {...formItemLayout}>
          {getFieldDecorator('repeatUserPass', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入重复密码',
              },
              {
                pattern: /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
              {
                validator: checkConfirm,
              },
            ],
          })(<Input type="password" placeholder="请输入重复密码" style={{ width: '90%' }} />)}
        </FormItem>
        <FormItem>
          <Button
            className={styles.submit}
            type="primary"
            htmlType="submit"
            style={{ width: '20%', marginLeft: '55%' }}
          >
            重置密码
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
export default Form.create()(Item);
