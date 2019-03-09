import React from 'react';
import { Modal, Form, Input, Select, TreeSelect } from 'antd';

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;
const RoomModal = ({
  room,
  mergeData,
  form: { getFieldDecorator, validateFields, getFieldsValue },
}) => {
  const modalChange = () => {};
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const handleOk = () => {
    validateFields((errors) => {
      if (!errors) {
        mergeData({ modalVisible: false });
      }
    });
  };
  const onCancel = () => {
    mergeData({ modalVisible: false });
  };
  const onTreeChange = () => {};
  let title = '新增宿舍';
  if (room.oPty === 'edit') {
    title = '编辑宿舍';
  }
  const modalOpts = {
    title,
    visible: room.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: room.loading,
  };
  const codeProps = {
    style: { minWidth: 300 },
    onChange({ target: { value } }) {
      modalChange(value, 'cateCode');
    },
    disabled: room.type === 'edit',
    placeholder: '请输入宿舍号',
  };
  const nameProps = {
    style: { minWidth: 300 },
    onChange({ target: { value } }) {
      modalChange(value, 'cateName');
    },
    placeholder: '请输入容纳人数',
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="宿舍号：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roomCode', {
            initialValue: room.roomCode,
            rules: [
              { required: true, message: '宿舍号未填写', whitespace: true },
              { max: 20, message: '最大长度不超过20' },
            ],
          })(<Input {...codeProps} />)}
        </FormItem>
        <FormItem label="宿舍类别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cateId', {
            initialValue: room.cateId || '',
            rules: [{ required: true, message: '宿舍分类未选择', whitespace: true }],
          })(
            <TreeSelect
              style={{ minWidth: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={room.treeData}
              placeholder="请选择宿舍类别"
              treeDefaultExpandAll
              onChange={onTreeChange}
            />,
          )}
        </FormItem>
        <FormItem label="楼号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('buildingId', {
            initialValue: room.buildingId || '',
            rules: [{ required: true, message: '宿舍楼号未选择', whitespace: true }],
          })(<Select style={{ minWidth: 300 }} placeholder="请选择宿舍楼号" />)}
        </FormItem>
        <FormItem label="容纳人数：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roomCount', {
            initialValue: room.roomCount,
            rules: [
              { required: true, message: '容纳人数未填写', whitespace: true },
              { max: 2, message: '最大长度不超过2' },
            ],
          })(<Input {...nameProps} />)}
        </FormItem>
      </Form>
    </Modal>
  );
};
export default Form.create()(RoomModal);
