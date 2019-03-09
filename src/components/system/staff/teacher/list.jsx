import React from 'react';
import { Table, Form } from 'antd';

const TeacherList = ({ mergeData, teacher, onPageChange }) => {
  const columns = [
    {
      title: '辅导员编号',
      dataIndex: 'teacherCode',
      key: 'teacherCode',
    },
    {
      title: '辅导员姓名',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: '手机号',
      dataIndex: 'teacherNumber',
      key: 'teacherNumber',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
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
      dataSource={teacher.teacherList}
      pagination={teacher.pagination}
      // loading={staff.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(TeacherList);
