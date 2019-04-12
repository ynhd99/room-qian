import React from 'react';
import { Modal, Form, Input, Row, Col, Tree } from 'antd';

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
  // const checkedArr = [];
  // const checkedList = (list) => {
  //   for (let i = 0; i < list.length; i += 1) {
  //     console.log(`iiiiiii${list[i].authorityName}`);
  //     if (list[i].children) {
  //       if (list[i].isSelect === 1) {
  //         checkedArr.push(list[i].id);
  //       }
  //       checkedList(list[i].children);
  //     }
  //   }
  //   console.log(`checkedArr${checkedArr[0]}`);
  //   return checkedArr;
  // };
  const renderTreeNodes = data =>
    data.map((item) => {
      console.log(`title${item.authorityName}`);
      if (item.children) {
        return (
          <Tree.TreeNode
            title={item.authorityName}
            key={item.id}
            dataRef={item}
            selected={item.isSelect === 1}
            defaultExpandedKeys={item.isSelect === 1 ? [item.id] : ''}
          >
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          title={item.authorityName}
          key={item.id}
          dataRef={item}
          checked={item.isSelect === 1}
        />
      );
    });
  const onCheck = (checkedKeys) => {
    console.log('selectedKeys', checkedKeys);
    const arr = [];
    for (let i = 0; i < checkedKeys.length; i += 1) {
      const object = {};
      object.authorityId = checkedKeys[i];
      arr[i] = object;
    }
    mergeData({ roleAuthorityList: arr });
  };

  const treeNode = renderTreeNodes(role.authorityList);
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
              })(
                <Input type="text" placeholder="请输入角色编码" disabled={role.oPty === 'edit'} />,
              )}
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
            <FormItem label="选择权限" {...formItemLayout}>
              <Tree checkable onCheck={onCheck} defaultCheckedKeys={role.selectedKeys}>
                {treeNode}
              </Tree>
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(RoleModal);
