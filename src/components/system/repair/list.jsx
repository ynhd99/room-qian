import React from 'react';
import { Table, Form, Popconfirm, Badge, Modal, Input } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const TextArea = Input.TextArea;
const RepairList = ({
  repair,
  onPageChange,
  mergeData,
  getDateList,
  updateStatus,
  updateRepair,
  form: { getFieldDecorator, validateFields, getFieldsValue },
}) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>宿舍号</span>,
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>维修物品</span>,
      dataIndex: 'goodsName',
      key: 'goodsName',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>维修时间</span>,
      dataIndex: 'repairDate',
      key: 'repairDate',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>申请人</span>,
      dataIndex: 'repairPerson',
      key: 'repairPerson',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>维修原因</span>,
      dataIndex: 'remark',
      key: 'remark',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>驳回原因</span>,
      dataIndex: 'reason',
      key: 'reason',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>业务状态</span>,
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align: 'center',
      render(text, record) {
        if (record.status === 1) {
          return <Badge status="warning" text="待审核" />;
        }
        if (record.status === 2) {
          return <Badge status="success" text="已审核" />;
        }
        if (record.status === 3) {
          return <Badge status="error" text="已驳回" />;
        }
        return null;
      },
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      align: 'center',
      render(text, record) {
        if (record.status === 1) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.REPAIR_LIST.EDIT.code}>
                <a
                  onClick={() => {
                    getDateList();
                    mergeData({
                      oPty: 'edit',
                      id: record.id,
                      modalVisible: true,
                      roomId: record.roomId,
                      goodsId: record.goodsId,
                      remark: record.remark,
                      repairDate: record.repairDate,
                      repairPerson: record.repairPerson,
                      status: 1,
                    });
                  }}
                >
                  编辑
                </a>
              </Permission>
              <Permission path={INVENTORY_PERMISSION.REPAIR_LIST.SHEN.code}>
                <Popconfirm
                  title="你确定要审核该申请吗？"
                  onConfirm={() => {
                    updateStatus({ id: record.id, status: 2 });
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <a> | 审核</a>
                </Popconfirm>
              </Permission>
              <Permission path={INVENTORY_PERMISSION.REPAIR_LIST.REJECT.code}>
                <a
                  onClick={() => {
                    mergeData({ visible: true, id: record.id, status: 3 });
                  }}
                >
                  | 驳回
                </a>
              </Permission>
            </div>
          );
        }
        if (record.status === 3) {
          return (
            <Permission path={INVENTORY_PERMISSION.REPAIR_LIST.EDIT.code}>
              <a
                onClick={() => {
                  getDateList();
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    roomId: record.roomId,
                    goodsId: record.goodsId,
                    remark: record.remark,
                    repairDate: record.repairDate,
                    repairPerson: record.repairPerson,
                    status: 1,
                  });
                }}
              >
                编辑
              </a>
            </Permission>
          );
        }
        return null;
      },
    },
  ];
  // form参数
  const itemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
    label: '驳回原因',
  };
  // modal框点击确定
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const value = {
        ...getFieldsValue(),
        visible: false,
      };
      mergeData(value);
      updateRepair({});
    });
  }
  // modal框参数
  const modalOpts = {
    title: '驳回',
    visible: repair.visible,
    onOk: handleOk,
    onCancel: () => mergeData({ visible: false }),
  };
  return (
    <div>
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <Form.Item {...itemLayout}>
            {getFieldDecorator('reason', {
              rules: [
                { required: true, message: '驳回原因未填写', whitespace: true },
                { max: 30, message: '最大长度不超过30' },
              ],
            })(<TextArea placeholder="请输入驳回原因" maxLength="30" rows={2} />)}
          </Form.Item>
        </Form>
      </Modal>
      <Table
        style={{ marginTop: '15px' }}
        dataSource={repair.repairList}
        columns={columns}
        // loading={loading}
        rowKey={record => record.id}
        onChange={onPageChange}
        pagination={repair.pagination}
      />
    </div>
  );
};
export default Form.create()(RepairList);
