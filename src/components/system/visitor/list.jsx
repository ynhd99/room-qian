import React from 'react';
import { Table, Form } from 'antd';

const VisitorList = ({ visitor, onPageChange, mergeData }) => {
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
      title: '到访时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '离开时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '到访事由',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(text, record) {
        return (
          <a
            onClick={() => {
              mergeData({
                oPty: 'edit',
                id: record.id,
                modalVisible: true,
                visitorName: record.visitorName,
                identityCode: record.identityCode,
                phoneNumber: record.phoneNumber,
                receptName: record.receptName,
                startTime: record.startTime,
              });
            }}
          >
            编辑
          </a>
        );
      },
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
