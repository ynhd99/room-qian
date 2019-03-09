import React from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from '../../../common/register.less';

const FormItem = Form.Item;
const Item = ({
  form: { getFieldDecorator, getFieldValue, validateFields },
  onChangeMobile,
  onSubmitInfo,
}) => {
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
      <h3>重置密码</h3>
      <Form onSubmit={handleSubmit}>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            validateTrigger: 'onChange',
            rules: [
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                message: '手机号格式错误！',
              },
            ],
          })(
            <Input
              size="large"
              style={{ width: '100%' }}
              placeholder="请输入11位手机号"
              onChange={onChangeMobile}
            />,
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('oldUserPass', {
            rules: [
              {
                required: true,
                message: '请输入原来的密码！',
              },
              {
                pattern: /^(?=.*?[A-Z])[\w]{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
            ],
          })(<Input size="large" type="password" placeholder="请输入原来的密码" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('newUserPass', {
            rules: [
              {
                required: true,
                message: '请输入新密码！',
              },
              {
                pattern: /^(?=.*?[A-Z])[\w]{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
            ],
          })(<Input size="large" type="password" placeholder="请输入新密码" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('repeatUserPass', {
            rules: [
              {
                required: true,
                message: '请输入确认密码！',
              },
              {
                validator: checkConfirm,
              },
            ],
          })(<Input size="large" type="password" placeholder="请输入确认密码" />)}
        </FormItem>
        <FormItem>
          <Button
            size="large"
            className={styles.submit}
            type="primary"
            htmlType="submit"
            // disabled={!allowSubmit}
          >
            重置密码
          </Button>
          <Link className={styles.login} to="/system/book/home">
            返回首页
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default Form.create()(Item);
