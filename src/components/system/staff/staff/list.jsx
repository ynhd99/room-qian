import React from 'react';
import { Table, Form } from 'antd';

const StaffList = ({ mergeData, staff, onPageChange }) => {
  const columns = [
    {
      title: '宿管员编号',
      dataIndex: 'staffCode',
      key: 'staffCode',
    },
    {
      title: '宿管员姓名',
      dataIndex: 'staffName',
      key: 'staffName',
    },
    {
      title: '手机号',
      dataIndex: 'staffPhone',
      key: 'staffPhone',
    },
    {
      title: '楼号',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: '性别',
      dataIndex: 'teacherSex',
      key: 'teacherSex',
    },
    {
      title: '操作',
      dataIndex: 'action',
    },
  ];
  return (
    <Table
      style={{ marginTop: '15px' }}
      columns={columns}
      dataSource={staff.staffList}
      pagination={staff.pagination}
      // loading={staff.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(StaffList);
