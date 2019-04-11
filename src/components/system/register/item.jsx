import React from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from '../../../common/register.less';

const FormItem = Form.Item;
const Item = ({
  form: { getFieldDecorator, getFieldValue, validateFields },
  onChangeMobile,
  onChangeAgreement,
  allowSubmit, // 提交标识
  onSubmitInfo,
}) => {
  const checkConfirm = (rule, value, callback) => {
    if (value && value !== getFieldValue('userPass')) {
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
      <h3>注册帐号</h3>
      <Form onSubmit={handleSubmit}>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            validateTrigger: 'onChange',
            rules: [
              {
                required: true,
                message: '请输入手机号！',
              },
              // {
              //   pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
              //   message: '手机号格式错误！',
              // },
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
          {getFieldDecorator('name', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: '请输入姓名！',
              },
              {
                pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                message: '请输入2到10位的中文或英文字符！',
              },
            ],
          })(<Input size="large" type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('userPass', {
            rules: [
              {
                required: true,
                message: '请输入密码！',
              },
              {
                pattern: /^(?=.*?[A-Z])[\w]{6,12}$/,
                message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
              },
            ],
          })(<Input size="large" type="password" placeholder="请输入密码" />)}
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
        <FormItem style={{ marginBottom: 8 }}>
          <Checkbox onChange={onChangeAgreement}>我同意辰森云平台</Checkbox>
        </FormItem>
        <FormItem>
          <Button
            size="large"
            className={styles.submit}
            type="primary"
            htmlType="submit"
            disabled={!allowSubmit}
          >
            注册
          </Button>
          <Link className={styles.login} to="/system/book/home">
            使用已有账户登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default Form.create()(Item);
