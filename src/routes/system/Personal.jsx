import React from 'react';
import { Form, Input } from 'antd';
import styles from '../../common/register.less';

const FormItem = Form.Item;

const Personal = () => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
  console.log(`hsuhqwuidshewuidheufdeyr--------${window.sessionStorage.getItem('userInfo').code}`);
  return (
    <div className={styles.main}>
      <Form>
        <FormItem hasFeedback label="编号" {...formItemLayout}>
          <Input value={userInfo.code} style={{ width: '70%' }} disabled />
        </FormItem>
        <FormItem hasFeedback label="姓名" {...formItemLayout}>
          <Input value={userInfo.name} style={{ width: '70%' }} disabled />
        </FormItem>
        <FormItem hasFeedback label="角色" {...formItemLayout}>
          <Input value={userInfo.roleName} style={{ width: '70%' }} disabled />
        </FormItem>
        <FormItem hasFeedback label="性别" {...formItemLayout}>
          <Input value={userInfo.sex} style={{ width: '70%' }} disabled />
        </FormItem>
        <FormItem hasFeedback label="手机号" {...formItemLayout}>
          <Input value={userInfo.phone} style={{ width: '70%' }} disabled />
        </FormItem>
        <FormItem hasFeedback label="学院" {...formItemLayout}>
          <Input value={userInfo.collegeName} style={{ width: '70%' }} disabled />
        </FormItem>
        <FormItem hasFeedback label="班级" {...formItemLayout}>
          <Input value={userInfo.className} style={{ width: '70%' }} disabled />
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(Personal);
