import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const RoomList = ({
  room,
  mergeData,
  updateStatus,
  deleteClass,
  onPageChange,
  getDataList,
  getAddDataList,
  deleteRoomDetail,
}) => {
  const columnsDetail = [
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '学号',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: '性别',
      dataIndex: 'studentSex',
      key: 'studentSex',
    },
    {
      title: '手机号',
      dataIndex: 'studentPhone',
      key: 'studentPhone',
    },
    {
      title: '入住日期',
      dataIndex: 'checkDate',
      key: 'checkDate',
    },
    {
      title: '床位号',
      dataIndex: 'bedCount',
      key: 'bedCount',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render(text, record) {
        return (
          <Permission path={INVENTORY_PERMISSION.ROOM_LIST.OPTION.code}>
            <Popconfirm
              title="你确定要将该学生从宿舍中移除码？"
              onConfirm={() => {
                deleteRoomDetail({ id: record.id, studentId: record.studentId });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Permission>
        );
      },
    },
  ];
  const columns = [
    {
      title: '宿舍号',
      dataIndex: 'roomCode',
      key: 'roomCode',
    },
    {
      title: '宿舍类别',
      render: (text, record) => (
        <span>
          {record.cateParentName}-{record.cateName}
        </span>
      ),
    },
    {
      title: '楼号',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: '容纳人数',
      dataIndex: 'roomCount',
      key: 'roomCount',
    },
    {
      title: '现有人数',
      dataIndex: 'currentCount',
      key: 'currentCount',
    },
    {
      title: '状态',
      dataIndex: 'status',
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
      dataIndex: 'action',
      render(text, record) {
        if (record.status === 0 && record.roomCount > record.currentCount) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.ROOM_LIST.OPTION.code}>
                <a
                  onClick={() => {
                    mergeData({
                      oPty: 'edit',
                      id: record.id,
                      modalVisible: true,
                      roomCode: record.roomCode,
                      cateId: record.cateId,
                      buildingId: record.buildingId,
                      roomCount: record.roomCount,
                    });
                    getDataList();
                  }}
                >
                  编辑 |
                </a>
                <a
                  onClick={() => {
                    mergeData({
                      oPty: 'edit',
                      id: record.id,
                      addModalVisible: true,
                    });
                    getAddDataList();
                  }}
                >
                  添加学生 |
                </a>
                <Popconfirm
                  title="你确定要停用该宿舍吗？"
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
        if (record.status === 0) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.ROOM_LIST.OPTION.code}>
                <a
                  onClick={() => {
                    mergeData({
                      oPty: 'edit',
                      id: record.id,
                      modalVisible: true,
                      roomCode: record.roomCode,
                      cateId: record.cateId,
                      buildingId: record.buildingId,
                      roomCount: record.roomCount,
                    });
                    getDataList();
                  }}
                >
                  编辑 |
                </a>
                <Popconfirm
                  title="你确定要停用该宿舍吗？"
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
            <Permission path={INVENTORY_PERMISSION.ROOM_LIST.OPTION.code}>
              <a
                onClick={() => {
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    roomCode: record.roomCode,
                    cateId: record.cateId,
                    buildingId: record.buildingId,
                    roomCount: record.roomCount,
                  });
                  getDataList();
                }}
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要启用该宿舍吗？"
                onConfirm={() => {
                  updateStatus({ id: record.id, status: 0 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 启用 |</a>
              </Popconfirm>
              <Popconfirm
                title="你确定要删除该宿舍吗？"
                onConfirm={() => {
                  deleteClass({ record });
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
      dataSource={room.roomList}
      columns={columns}
      // loading={loading}
      rowKey={record => record.id}
      pagination={room.pagination} // 分页器:不分页
      onChange={onPageChange}
      expandedRowRender={record => (
        <Table
          dataSource={record.roomDetailInfoList}
          pagination={false}
          rowKey={record.id}
          columns={columnsDetail}
        />
      )}
    />
  );
};
export default Form.create()(RoomList);
