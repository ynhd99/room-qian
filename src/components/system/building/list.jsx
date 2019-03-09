import React from 'react';
import { Table, Form } from 'antd';

const BuildingList = ({ mergeData, building, onPageChange }) => {
  const columns = [
    {
      title: '宿舍楼编码',
      dataIndex: 'buildingCode',
      key: 'buildingCode',
    },
    {
      title: '宿舍楼名称',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: '宿管人员',
      dataIndex: 'stallName',
      key: 'stallName',
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
      dataSource={building.buildingList}
      pagination={building.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(BuildingList);
