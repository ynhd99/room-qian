import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;

const CollegeModal = ({
  college,
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
    mergeData({ modalVisible: false });
  };
  const onCancel = () => {
    mergeData({ modalVisible: false, deportCode: '', deportName: '', oPty: '' });
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
    title: college.oPty === 'edit' ? '编辑学院信息' : '添加学院信息',
    visible: college.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    // confirmLoading: college.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="学院编码" {...formItemLayout}>
              {getFieldDecorator('collegeCode', {
                initialValue: college.collegeCode,
                rules: [
                  {
                    required: true,
                    message: '请输入学院编码',
                  },
                  {
                    pattern: /^[0-9]{1,10}$/,
                    message: '请输入1到10位的数字！',
                  },
                ],
              })(
                <Input
                  type="text"
                  placeholder="请输入学院编码（1到10位的数字）"
                  disabled={college.oPty === 'edit'}
                />,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="学院名称" {...formItemLayout}>
              {getFieldDecorator('collegeName', {
                initialValue: college.collegeName,
                rules: [
                  {
                    required: true,
                    message: '请输入学院名称',
                  },
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="请输入学院名称（2到10位的中文或英文字符）" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(CollegeModal);
