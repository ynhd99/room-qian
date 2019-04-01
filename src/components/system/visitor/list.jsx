import React from 'react';
import { Table, Form } from 'antd';

const VisitorList = ({ visitor, onPageChange }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'visitorName',
      key: 'visitorName',
    },
    {
      title: '证件号',
      dataIndex: 'identityCode',
      key: 'identityCode',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '接待人',
      dataIndex: 'receptName',
      key: 'receptName',
    },
    {
      title: 'startTime',
      dataIndex: 'startTime',
      key: '访问开始时间',
    },
    {
      title: 'endTime',
      dataIndex: 'endTime',
      key: '访问结束时间',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  return (
    <Table
      dataSource={visitor.visitorList}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      onChange={onPageChange}
      pagination={visitor.pagination}
    />
  );
};
export default Form.create()(VisitorList);
