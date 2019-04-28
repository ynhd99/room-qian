import React from 'react';
import { Table, Form } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const VisitorList = ({ visitor, onPageChange, mergeData }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>姓名</span>,
      dataIndex: 'visitorName',
      key: 'visitorName',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>证件号</span>,
      dataIndex: 'identityCode',
      key: 'identityCode',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>手机号</span>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>接待人</span>,
      dataIndex: 'receptName',
      key: 'receptName',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>到访时间</span>,
      dataIndex: 'startTime',
      key: 'startTime',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>离开时间</span>,
      dataIndex: 'endTime',
      key: 'endTime',
      width: '10%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>到访事由</span>,
      dataIndex: 'remark',
      key: 'remark',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      key: 'action',
      align: 'center',
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
