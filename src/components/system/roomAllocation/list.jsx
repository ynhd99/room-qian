import React from 'react';
import { Table, Form } from 'antd';

const RoomAllocationList = ({ roomAllocation }) => {
  const columns = [
    {
      title: '楼号',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
    },
    {
      title: '宿舍类型',
      dataIndex: 'cateName',
      key: 'cateName',
    },
    {
      title: '容纳人数',
      dataIndex: 'roomCount',
      key: 'roomCount',
    },
    {
      title: '当前人数',
      dataIndex: 'roomCurrent',
      key: 'roomCurrent',
    },
    {
      title: '操作',
      dataIndex: 'oparateData',
      key: 'oparateData',
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
export default Form.create()(RoomAllocationList);
