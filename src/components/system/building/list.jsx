import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';

const BuildingList = ({ mergeData, building, onPageChange, updateStatus, deleteBuilding }) => {
  const columns = [
    {
      title: '宿舍楼编码',
      dataIndex: 'buildingCode',
      key: 'buildingCode',
      width: '15%',
    },
    {
      title: '宿舍楼名称',
      dataIndex: 'buildingName',
      key: 'buildingName',
      width: '15%',
    },
    {
      title: '宿管员名称',
      dataIndex: 'staffName',
      key: 'stallName',
      width: '15%',
    },
    {
      title: '宿管人员联系电话',
      dataIndex: 'staffPhone',
      key: 'stallPhone',
      width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render(text, record) {
        if (record.status === 0) {
          return <Badge status="success" text="启用" />;
        } else if (record.status === 1) {
          return <Badge status="error" text="停用" />;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '20%',
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
                deleteBuilding({ record });
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
      dataSource={building.buildingList}
      pagination={building.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(BuildingList);
