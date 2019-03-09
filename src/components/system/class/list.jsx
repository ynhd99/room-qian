import React from 'react';
import { Table, Form } from 'antd';

const ClassList = ({ mergeData, classRoom, onPageChange }) => {
  const columns = [
    {
      title: '班级代码',
      dataIndex: 'classCode',
      key: 'classCode',
    },
    {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '学院',
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
      dataSource={classRoom.classList}
      pagination={classRoom.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(ClassList);
