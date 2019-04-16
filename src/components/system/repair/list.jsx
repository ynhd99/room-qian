import React from 'react';
import { Table, Form, Popconfirm, Badge } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const RepairList = ({ repair, onPageChange, mergeData, getDateList, updateStatus }) => {
  const columns = [
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: '10%',
    },
    {
      title: '维修物品',
      dataIndex: 'goodsName',
      key: 'goodsName',
      width: '15%',
    },
    {
      title: '维修时间',
      dataIndex: 'repairDate',
      key: 'repairDate',
      width: '15%',
    },
    {
      title: '申请人',
      dataIndex: 'repairPerson',
      key: 'repairPerson',
      width: '10%',
    },
    {
      title: '维修原因',
      dataIndex: 'remark',
      key: 'remark',
      width: '20%',
    },
    {
      title: '业务状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render(text, record) {
        if (record.status === 1) {
          return <Badge status="success" text="待审核" />;
        }
        if (record.status === 2) {
          return <Badge status="success" text="已审核" />;
        }
        if (record.status === 3) {
          return <Badge status="success" text="已驳回" />;
        }
        return null;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
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
                <Popconfirm
                  title="你确定要驳回该申请吗？"
                  onConfirm={() => {
                    updateStatus({ id: record.id, status: 3 });
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <a> | 驳回</a>
                </Popconfirm>
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
  return (
    <Table
      dataSource={repair.repairList}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      onChange={onPageChange}
      pagination={repair.pagination}
    />
  );
};
export default Form.create()(RepairList);
