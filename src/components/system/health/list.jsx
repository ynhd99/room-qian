import React from 'react';
import { Table, Form } from 'antd';

const HealthList = ({ health, onPageChange, mergeData, getDateList }) => {
  const columns = [
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: '20%',
    },
    {
      title: '检查日期',
      dataIndex: 'checkDate',
      key: 'checkDate',
      width: '20%',
    },
    {
      title: '检查分数',
      dataIndex: 'checkPoint',
      key: 'checkPoint',
      width: '15%',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: '30%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render(text, record) {
        return (
          <a
            onClick={() => {
              getDateList();
              mergeData({
                oPty: 'edit',
                id: record.id,
                modalVisible: true,
                roomId: record.roomId,
                checkPoint: record.checkPoint,
                remark: record.remark,
              });
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
      dataSource={health.healthList}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      onChange={onPageChange}
      pagination={health.pagination}
    />
  );
};
export default Form.create()(HealthList);
