import React from 'react';
import { Table, Form } from 'antd';

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
      width: '20%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      render(text, record) {
        return (
          <a
            onClick={() => {
              mergeData({
                oPty: 'edit',
                id: record.id,
                modalVisible: true,
                // roomCode: record.roomCode,
                // goodsName: record.goodsName,
                // repairDate: record.repairDate,
                // remark: record.remark,
              });
              getDateList();
            }}
          >
            编辑
          </a>
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
