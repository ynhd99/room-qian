import React from 'react';
import { Table, Form } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const VisitorList = ({ visitor, onPageChange, mergeData }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'visitorName',
      key: 'visitorName',
      width: '10%',
    },
    {
      title: '证件号',
      dataIndex: 'identityCode',
      key: 'identityCode',
      width: '15%',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '10%',
    },
    {
      title: '接待人',
      dataIndex: 'receptName',
      key: 'receptName',
      width: '10%',
    },
    {
      title: '到访时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '10%',
    },
    {
      title: '离开时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: '10%',
    },
    {
      title: '到访事由',
      dataIndex: 'remark',
      key: 'remark',
      width: '15%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(text, record) {
        return (
          <Permission path={INVENTORY_PERMISSION.VISITE_LIST.OPTION.code}>
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
                  endTime: record.endTime,
                  remark: record.remark,
                });
              }}
            >
              编辑
            </a>
          </Permission>
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
