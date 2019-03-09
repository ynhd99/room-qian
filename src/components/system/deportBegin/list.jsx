import React from 'react';
import { Badge, Table, Form } from 'antd';

const DeportBeginList = ({ loading }) => {
  // 列表设置
  const columns = [
    {
      title: '仓库编码',
      dataIndex: 'depotCode',
      key: 'depotCode',
    },
    {
      title: '仓库名称',
      dataIndex: 'depotName',
      key: 'depotName',
    },
    {
      title: '期初状态',
      dataIndex: 'beginFlag',
      key: 'beginFlag',
      render: text => (
        <Badge
          status={{ 0: 'default', 1: 'success' }[text]}
          text={{ 0: '未做期初', 1: '已做期初' }[text]}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  return (
    <div>
      <Table
        // dataSource={}
        columns={columns}
        // loading={loading}
        rowKey={record => record.id}
        pagination={false} // 分页器:不分页
      />
    </div>
  );
};

export default Form.create()(DeportBeginList);
