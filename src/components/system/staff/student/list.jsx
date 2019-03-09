import React from 'react';
import { Table, Form } from 'antd';

const StudentList = ({ mergeData, student, onPageChange }) => {
  const columns = [
    {
      title: '学号',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: '手机号',
      dataIndex: 'staffNumber',
      key: 'staffNumber',
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
      title: '操作',
      dataIndex: 'action',
    },
  ];
  return (
    <Table
      style={{ marginTop: '15px' }}
      columns={columns}
      dataSource={student.studentList}
      pagination={student.pagination}
      // loading={staff.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(StudentList);
