import React from 'react';
import { Table, Form } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const RepairList = ({ repair, onPageChange, mergeData, getDateList }) => {
  const columns = [
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: '20%',
    },
    {
      title: '维修物品',
      dataIndex: 'goodsName',
      key: 'goodsName',
      width: '20%',
    },
    {
      title: '维修时间',
      dataIndex: 'repairDate',
      key: 'repairDate',
      width: '20%',
    },
    {
      title: '维修原因',
      dataIndex: 'remark',
      key: 'remark',
      width: '25%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render(text, record) {
        return (
          <Permission path={INVENTORY_PERMISSION.REPAIR_LIST.OPTION.code}>
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
                });
              }}
            >
              编辑
            </a>
          </Permission>
        );
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
