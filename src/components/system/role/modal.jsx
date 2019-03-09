import React from 'react';
import { Modal, Form, Input, Row, Col, TreeSelect } from 'antd';

const FormItem = Form.Item;

const RoleModal = ({
  role,
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
    title: role.oPty === 'edit' ? '编辑角色' : '添加角色',
    visible: role.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: role.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="角色编码" {...formItemLayout}>
              {getFieldDecorator('roleCode', {
                initialValue: role.roleCode,
                rules: [
                  {
                    required: true,
                    message: '请输入角色编码',
                  },
                ],
              })(<Input type="text" placeholder="请输入角色编码" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="角色名称" {...formItemLayout}>
              {getFieldDecorator('roleName', {
                initialValue: role.roleName,
                rules: [
                  {
                    required: true,
                    message: '请输入角色名称',
                  },
                ],
              })(<Input type="text" placeholder="请输入角色名称" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="权限" {...formItemLayout}>
              {getFieldDecorator('authorityId', {
                initialValue: role.authorityId,
              })(<TreeSelect placeholder="请选择隶属机构" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(RoleModal);
