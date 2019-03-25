import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';

const PropertyList = ({ mergeData, property, onPageChange, updateStatus, deleteGoods }) => {
  const columns = [
    {
      title: '物品编码',
      dataIndex: 'goodsCode',
      key: 'goodsCode',
    },
    {
      title: '物品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text, record) {
        if (record.status === 0) {
          return <Badge status="success" text="启用" />;
        }
        return <Badge status="error" text="停用" />;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <a
                onClick={() =>
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    goodsCode: record.goodsCode,
                    goodsName: record.goodsName,
                  })
                }
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要停用该物品吗？"
                onConfirm={() => {
                  updateStatus({ id: record.id, status: 1 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 停用</a>
              </Popconfirm>
            </div>
          );
        }
        return (
          <div>
            <a
              onClick={() =>
                mergeData({
                  oPty: 'edit',
                  id: record.id,
                  modalVisible: true,
                  goodsCode: record.goodsCode,
                  goodsName: record.goodsName,
                })
              }
            >
              编辑 |
            </a>
            <Popconfirm
              title="你确定要启用该物品吗？"
              onConfirm={() => {
                updateStatus({ id: record.id, status: 0 });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a> 启用 |</a>
            </Popconfirm>
            <Popconfirm
              title="你确定要删除该物品吗？"
              onConfirm={() => {
                deleteGoods({ record });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a> 删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <Table
      style={{ marginTop: '15px' }}
      columns={columns}
      dataSource={property.goodsList}
      pagination={property.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(PropertyList);
