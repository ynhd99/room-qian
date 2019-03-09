import React from 'react';
import { Table, Form } from 'antd';

const CollegeList = ({ mergeData, college, onPageChange }) => {
  const columns = [
    {
      title: '学院代码',
      dataIndex: 'collegeCode',
      key: 'collegeCode',
    },
    {
      title: '学院名称',
      dataIndex: 'collegeName',
      key: 'collegeName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
      dataSource={college.staffList}
      pagination={college.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(CollegeList);
