import React from 'react';
import { Modal, Form, Input, Select, TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const RoomModal = ({
  room,
  mergeData,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  modalHandleOk,
}) => {
  const filterOption = (inputValue, option) => {
    const props = option.props;
    const qs = props.queryString;
    const reg = new RegExp(inputValue, 'i');
    if (typeof props.children === 'string') {
      return false;
    }
    if (qs && reg.test(qs)) {
      return true;
    }
    return false;
  };
  const buildingOperation =
    room.buildingList &&
    room.buildingList.map(building => (
      <Select.Option
        value={building.id}
        key={building.id}
        queryString={`${building.buildingName} | ${building.buildingCode}`}
      >
        {building.buildingName} | {building.buildingCode}
      </Select.Option>
    ));
  const cateTreeGenerate =
    room.cateList &&
    room.cateList.map((cate) => {
      if (cate.children[0]) {
        return (
          <TreeNode value={cate.id} title={cate.cateName} key={cate.id}>
            {cate.children.map(item => (
              <TreeNode value={item.id} title={item.cateName} key={item.id} />
            ))}
          </TreeNode>
        );
      }
      return null;
    });
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
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
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="宿舍号：" {...formItemLayout}>
          {getFieldDecorator('roomCode', {
            initialValue: room.roomCode,
            rules: [
              { required: true, message: '宿舍号未填写', whitespace: true },
              { max: 20, message: '最大长度不超过20' },
            ],
          })(<Input type="text" placeholder="请输入宿舍号" disabled={room.oPty === 'edit'} />)}
        </FormItem>
        <FormItem label="宿舍类别" {...formItemLayout}>
          {getFieldDecorator('cateId', {
            initialValue: room.cateId === '' ? '请选择类别' : room.cateId,
            rules: [{ required: true, message: '宿舍分类未选择', whitespace: true }],
          })(
            <TreeSelect
              style={{ minWidth: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择宿舍类别"
              treeDefaultExpandAll
              onChange={(value) => {
                mergeData({ cateId: value });
              }}
            >
              {cateTreeGenerate}
            </TreeSelect>,
          )}
        </FormItem>
        <FormItem label="楼号" {...formItemLayout}>
          {getFieldDecorator('buildingId', {
            initialValue: room.buildingId === '' ? '请选择楼号' : room.buildingId,
            rules: [{ required: true, message: '宿舍楼号未选择', whitespace: true }],
          })(
            <Select
              style={{ minWidth: 215 }}
              showSearch
              filterOption={filterOption}
              onChange={(value) => {
                mergeData({ buildingId: value });
              }}
              placeholder="请选择所属楼号"
            >
              {buildingOperation}
            </Select>,
          )}
        </FormItem>
        <FormItem label="容纳人数：" {...formItemLayout}>
          {getFieldDecorator('roomCount', {
            initialValue: room.roomCount,
            rules: [
              { required: true, message: '容纳人数未填写', whitespace: true },
              { max: 2, message: '最大长度不超过2' },
            ],
          })(<Input type="text" placeholder="请输入容纳人数" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};
export default Form.create()(RoomModal);
