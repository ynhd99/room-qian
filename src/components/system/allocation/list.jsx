import React from 'react';
import { Table, Form } from 'antd';

const AllocationList = ({ allocation }) => {
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
      title: '姓名',
      dataIndex: 'staffname',
      key: 'staffname',
    },
    {
      title: '学号',
      dataIndex: 'staffCode',
      key: 'staffCode',
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
      title: '办理日期',
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
export default Form.create()(AllocationList);
