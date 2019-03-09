import React from 'react';
import { Table, Form } from 'antd';

const PropertyList = ({ mergeData, property, onPageChange }) => {
  const columns = [
    {
      title: '物品编码',
      dataIndex: 'propertyCode',
      key: 'propertyCode',
    },
    {
      title: '物品名称',
      dataIndex: 'propertyName',
      key: 'propertyName',
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
      dataSource={property.propertyList}
      pagination={property.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(PropertyList);
