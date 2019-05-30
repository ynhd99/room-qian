import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const BuildingList = ({ mergeData, building, onPageChange, updateStatus, deleteBuilding }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>宿舍楼编码</span>,
      dataIndex: 'buildingCode',
      key: 'buildingCode',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>宿舍楼名称</span>,
      dataIndex: 'buildingName',
      key: 'buildingName',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>宿管员名称</span>,
      dataIndex: 'staffName',
      key: 'stallName',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>宿管员联系电话</span>,
      dataIndex: 'staffPhone',
      key: 'stallPhone',
      width: '20%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>状态</span>,
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render(text, record) {
        if (record.status === 0) {
          return <Badge status="success" text="启用" />;
        } else if (record.status === 1) {
          return <Badge status="error" text="停用" />;
        }
        return null;
      },
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      width: '20%',
      align: 'center',
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.BUILDING_LIST.OPTION.code}>
                <a

                  onClick={() =>
                    mergeData({
                      oPty: 'edit',
                      id: record.id,
                      modalVisible: true,
                      buildingCode: record.buildingCode,
                      buildingName: record.buildingName,
                      staffId: record.staffId,
                    })
                  }
                >
                  编辑 |
                </a>
                <Popconfirm
                  title="你确定要停用该教学楼吗？"
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
            <Permission path={INVENTORY_PERMISSION.BUILDING_LIST.OPTION.code}>
              <a
                onClick={() =>
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    buildingCode: record.buildingCode,
                    buildingName: record.buildingName,
                    staffId: record.staffId,
                  })
                }
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要启用该教学楼吗？"
                onConfirm={() => {
                  updateStatus({ id: record.id, status: 0 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 启用 |</a>
              </Popconfirm>
              <Popconfirm
                title="你确定要删除该教学楼吗？"
                onConfirm={() => {
                  deleteBuilding({ id: record.id });
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
      dataSource={building.buildingList}
      pagination={building.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(BuildingList);
