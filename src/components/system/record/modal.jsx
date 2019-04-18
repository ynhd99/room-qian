import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RecordModal = ({
  record,
  form: { getFieldDecorator, validateFields },
  modalHandleOk,
  mergeData,
}) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        modalHandleOk(values);
      }
    });
  };
  const onCancel = () => {
    mergeData({ modalVisible: false });
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const modalOpts = {
    width: 600,
    title: record.oPty === 'add' ? '新增公告信息' : '修改公告信息',
    visible: record.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: record.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="标题" {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: record.title,
                rules: [
                  {
                    required: true,
                    message: '请输入公告标题',
                  },
                  { max: 100, message: '请输入100个字符以内' },
                ],
              })(<Input type="text" placeholder="请输入公告标题，最多100个字符" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="公告内容" {...formItemLayout}>
              {getFieldDecorator('content', {
                initialValue: record.content,
                rules: [
                  {
                    required: true,
                    message: '请输入公告内容',
                  },
                  { max: 500, message: '请输入500个字符以内' },
                ],
              })(<TextArea type="text" placeholder="请输入公告内容，最多500个字符" rows={4} />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(RecordModal);
