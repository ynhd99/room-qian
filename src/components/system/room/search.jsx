import React from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const FormItem = Form.Item;
const RoomSearch = ({
  mergeData,
  form: { getFieldDecorator },
  room,
  searchAction,
  getDataList,
}) => {
  const formItemLayout1 = {
    wrapperCol: {
      offset: 15,
    },
  };
  const changeStatusList = () => {};
  return (
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
      <Permission path={INVENTORY_PERMISSION.ROOM_LIST.ADD.code}>
        <Row>
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
        </Row>
      </Permission>
    </div>
  );
};
export default Form.create()(RoomSearch);
