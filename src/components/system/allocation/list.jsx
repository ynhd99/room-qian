import React from 'react';
import { Table, Form } from 'antd';

const AllocationList = ({ allocation, onPageChange }) => {
  const columns = [
    {
      title: '楼号',
      dataIndex: 'buildingCode',
      key: 'buildingCode',
    },
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: '学号',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '入住日期',
      dataIndex: 'checkDate',
      key: 'checkDate',
    },
    {
      title: '退宿日期',
      dataIndex: 'deleteDate',
      key: 'deleteDate',
    },
    {
      title: '床号',
      dataIndex: 'bedCount',
      key: 'bedCount',
    },
  ];
  return (
    <Table
      dataSource={allocation.studentList}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      pagination={onPageChange} // 分页器:不分页
    />
  );
};
export default Form.create()(AllocationList);
