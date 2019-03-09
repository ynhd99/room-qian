import React from 'react';
import { Form, Row, Col, Select, Button, Breadcrumb } from 'antd';

const FormItem = Form.Item;
const DetailInfo = ({
  form: { getFieldDecorator },
  allocationDetail,
  roomAllocation,
  mergeData,
}) => {
  console.log(roomAllocation.pageType);
  return (
    <div className="components-search">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span style={{ fontSize: '16' }}>宿舍分配->新增学生</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr />
      </div>
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem label="楼号">
              {getFieldDecorator('buildingId', {
                initialValue: allocationDetail.buildingId,
              })(
                roomAllocation.pageType === 'add' ? (
                  <Select style={{ minWidth: 215 }} placeholder="请选择楼号">
                    <Select.Option key="" value="" disabled={allocationDetail.buildingId === ''}>
                      请选择宿舍号
                    </Select.Option>
                  </Select>
                ) : (
                  <span>{allocationDetail.buildingName}</span>
                ),
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="宿舍号">
              {getFieldDecorator('roomId', {
                initialValue: allocationDetail.roomId,
              })(
                roomAllocation.pageType === 'add' ? (
                  <Select style={{ minWidth: 215 }} placeholder="请选择宿舍号">
                    <Select.Option key="" value="" disabled={allocationDetail.roomId === ''}>
                      请选择宿舍号
                    </Select.Option>
                  </Select>
                ) : (
                  <span>{allocationDetail.roomName}</span>
                ),
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="容纳人数">
              {getFieldDecorator('roomCount', {
                initialValue: allocationDetail.roomCount,
              })(<span>{allocationDetail.roomCount}</span>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            mergeData({ modalVisible: true });
          }}
        >
          新增学生
        </Button>
      </Row>
    </div>
  );
};
export default Form.create()(DetailInfo);
