import React from 'react';
import { Badge, Table, Form, Popconfirm } from 'antd';

const DeportList = ({ deport, delDeport, updateStatus, onPageChange, showModal }) => {
  const state = deport;
  // 列表设置
  const columns = [
    {
      title: '仓库编码',
      dataIndex: 'deportCode',
      key: 'depotCode',
    },
    {
      title: '仓库名称',
      dataIndex: 'deportName',
      key: 'depotName',
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        <Badge
          status={{ 0: 'success', 1: 'error' }[text]}
          text={{ 0: '已使用', 1: '未使用' }[text]}
        />
      ),
    },
    {
      title: '操作',
      width: '200',
      render: (text, record) => {
        if (record.status === 0) {
          return (
            <div>
              <a onClick={() => showModal('edit', record)}>编辑 |</a>
              <span className="ant-divider" />
              <Popconfirm
                title="您确定停用此销售关系吗？"
                onConfirm={() => {
                  updateStatus({ record, status: 1 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 停用</a>
              </Popconfirm>
            </div>
          );
        }
        if (record.status === 1) {
          return (
            <div>
              <a onClick={() => showModal('edit', record)}>编辑 |</a>
              <Popconfirm
                title="您确定启用此销售关系吗？"
                onConfirm={() => {
                  updateStatus({ record, status: 0 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 启用 |</a>
              </Popconfirm>
              <span className="antd-divider" />
              <Popconfirm
                title="您确定删除此销售关系吗？"
                onConfirm={() => {
                  delDeport({ record });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 删除</a>
              </Popconfirm>
            </div>
          );
        }
        return '';
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={state.deportList}
        columns={columns}
        loading={state.loading}
        rowKey={record => record.id}
        pagination={state.pagination} // 进行分页
        onChange={onPageChange}
      />
    </div>
  );
};

export default Form.create()(DeportList);
