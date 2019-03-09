import React from 'react';
import { Table, Form } from 'antd';

const RoomList = ({ room }) => {
  const columns = [
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
    },
    {
      title: '宿舍类别',
      dataIndex: 'cateName',
      key: 'cateName',
    },
    {
      title: '楼号',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: '容纳人数',
      dataIndex: 'roomCount',
      key: 'roomCount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  return (
    <Table
      // dataSource={}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      pagination={false} // 分页器:不分页
    />
  );
};
export default Form.create()(RoomList);
