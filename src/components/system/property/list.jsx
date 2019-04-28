import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const PropertyList = ({ mergeData, property, onPageChange, updateStatus, deleteGoods }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>物品编码</span>,
      dataIndex: 'goodsCode',
      key: 'goodsCode',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>物品名称</span>,
      dataIndex: 'goodsName',
      key: 'goodsName',
      width: '25%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>状态</span>,
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      align: 'center',
      render(text, record) {
        if (record.status === 0) {
          return <Badge status="success" text="启用" />;
        }
        return <Badge status="error" text="停用" />;
      },
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      width: '30%',
      align: 'center',
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.GOODS_LIST.OPTION.code}>
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
              </Permission>
            </div>
          );
        }
        return (
          <div>
            <Permission path={INVENTORY_PERMISSION.GOODS_LIST.OPTION.code}>
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
            </Permission>
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
