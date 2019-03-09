import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';

const CateList = ({ roomCate, showModal, updateStatus, delDeport }) => {
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'cateName',
      key: 'cateName',
    },
    {
      title: '分类编码',
      dataIndex: 'cateCode',
      key: 'cateCode',
    },
    {
      title: '分类描述',
      dataIndex: 'cateDesc',
      key: 'cateDesc',
    },
    {
      title: '分类状态',
      dataIndex: 'status',
      width: 100,
      render(text, record) {
        if (record.parentId === '-1') {
          return null;
        }
        if (record.status === 0) {
          return <Badge status="success" text="启用" />;
        }
        return <Badge status="error" text="停用" />;
      },
    },
    {
      title: '操作',
      width: '200',
      render(text, record) {
        if (record.parentId === '-1') {
          return (
            <div>
              <a onClick={() => showModal('edit', record)}>编辑 |</a>
              <span className="ant-divider" />
              <Popconfirm
                title="删除主类，将删除主类下的子类，确定要删除吗？"
                onConfirm={() => {
                  updateStatus({ record, status: 1 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 删除</a>
              </Popconfirm>
            </div>
          );
        }
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
      },
    },
  ];
  return (
    <Table
      dataSource={roomCate.cateList}
      columns={columns}
      loading={roomCate.loading}
      rowKey={record => record.id}
      defaultExpandAllRows
      pagination={false}
    />
  );
};
export default Form.create()(CateList);
