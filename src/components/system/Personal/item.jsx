import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import styles from '../../../common/register.less';

const FormItem = Form.Item;
const PersonalItem = ({ personal, form: { getFieldDecorator, validateFields }, modalHandleOk }) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        modalHandleOk(values);
      }
    });
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };
  return (
    <div className={styles.main}>
      <Form onSubmit={handleOk()}>
        <Col>
          <Row>
            <FormItem label="用户姓名" hasFeedback {...formItemLayout}>
              {getFieldDecorator('fullName', {
                initialValue: personal.fullName,
              })(<Input />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="账号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: personal.userName,
              })(<Input />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="密码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('userPass', {
                initialValue: personal.userPass,
              })(<Input type="password" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="新密码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('userPass', {
                initialValue: personal.userPass,
              })(<Input type="password" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                // disabled={!allowSubmit}
              >
                重置密码
              </Button>
            </FormItem>
          </Row>
        </Col>
      </Form>
    </div>
  );
};
export default Form.create()(PersonalItem);
