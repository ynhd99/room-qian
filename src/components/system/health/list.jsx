import React from 'react';
import { Table, Form } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const HealthList = ({ health, onPageChange, mergeData, getDateList }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>宿舍号</span>,
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>检查日期</span>,
      dataIndex: 'checkDate',
      key: 'checkDate',
      width: '20%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>检查分数</span>,
      dataIndex: 'checkPoint',
      key: 'checkPoint',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>备注</span>,
      dataIndex: 'remark',
      key: 'remark',
      width: '30%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      align: 'center',
      render(text, record) {
        return (
          <Permission path={INVENTORY_PERMISSION.HEALTH_LIST.OPTION.code}>
            <a
              onClick={() => {
                getDateList();
                mergeData({
                  oPty: 'edit',
                  id: record.id,
                  modalVisible: true,
                  roomId: record.roomId,
                  checkDate: record.checkDate,
                  checkPoint: record.checkPoint,
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
      dataSource={health.healthList}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      onChange={onPageChange}
      pagination={health.pagination}
    />
  );
};
export default Form.create()(HealthList);
