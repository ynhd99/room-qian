import React from 'react';
import { Form, Input, Row, Col, Button, Radio, Upload, Icon, message, Modal } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const FormItem = Form.Item;
const RoomSearch = ({
  mergeData,
  form: { getFieldDecorator },
  room,
  searchAction,
  getDataList,
  exportRoom,
}) => {
  const authToken = window.sessionStorage.getItem('token');
  const onChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      console.log(info.file.response.uploadStatus);
      if (!info.file.response.uploadStatus) {
        console.log('愁死我了  你到底是个啥');
        mergeData({ errorVisible: true, errorList: info.file.response.errorList });
      } else {
        message.success(`已成功导入${info.file.response.importMsg}条数据`);
        searchAction();
      }
    } else if (info.file.status === 'error') {
      message.error('导入失败');
    }
  };
  const beforeUpload = (file) => {
    const arr = ['', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const isImg = arr.indexOf(file.type) !== -1;
    if (!isImg) {
      message.error('请上传 xlsx ,xls 格式的文件');
    }
    return isImg;
  };
  const handleStatus = () => {
    mergeData({ errorVisible: false });
    searchAction();
  };
  const modelProps = {
    title: '导入错误信息',
    visible: room.errorVisible,
    onOk: handleStatus,
    onCancel: handleStatus,
  };
  const props = {
    name: 'file',
    action: `api/room/importRoom?authToken=${authToken}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange,
    beforeUpload,
  };
  const props1 = {
    name: 'file',
    action: `api/roomDetail/importRoomDetail?authToken=${authToken}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange,
    beforeUpload,
  };
  return (
    <div>
      <Modal {...modelProps}>
        {room.errorList.map(item => (
          <p>{item}</p>
       ))}
      </Modal>
      <div className="components-search">
        <Form layout="inline">
          <Row>
            <Col span={8}>
              <FormItem label="宿舍号">
                {getFieldDecorator('roomCode', {
                  initialValue: room.queryString,
                })(
                  <Input
                    placeholder="请输入宿舍号"
                    onChange={(value) => {
                      mergeData({ queryString: value.target.value });
                      searchAction();
                    }}
                  />,
              )}
              </FormItem>
            </Col>
            <Col span={8}>
              <Form.Item label="状态">
                {getFieldDecorator('status', {
                  initialValue: room.status || '',
                })(
                  <Radio.Group
                    style={{ minWidth: 215 }}
                    onChange={(value) => {
                      mergeData({ status: value.target.value });
                      searchAction();
                    }}
                  >
                    <Radio.Button value="0">开启</Radio.Button>
                    <Radio.Button value="1">停用</Radio.Button>
                    <Radio.Button value="">全部</Radio.Button>
                  </Radio.Group>,
              )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row>
          <Permission path={INVENTORY_PERMISSION.ROOM_LIST.ADD.code}>
            <Button
              type="primary"
              onClick={() => {
                mergeData({
                  modalVisible: true,
                  oPty: 'add',
                  roomCode: '',
                  cateId: '',
                  buildingId: '',
                  roomCount: '',
                });
                getDataList();
              }}
            >
            添加宿舍
          </Button>
          </Permission>
      &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
            <Button
              type="primary"
              onClick={() => {
                exportRoom({});
              }}
            >
                    导出宿舍信息
                  </Button>
          </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
            <Upload {...props}>
              <Icon type="upload" /> 导入宿舍
                  </Upload>
          </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
            <Upload {...props1}>
              <Icon type="upload" /> 导入宿舍分配
                  </Upload>
          </Permission>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(RoomSearch);
