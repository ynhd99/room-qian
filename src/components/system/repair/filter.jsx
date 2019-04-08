import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, DatePicker, Input } from 'antd';

const FormItem = Form.Item;
const RepairSearch = ({
  repair,
  mergeData,
  onSubmitInfo,
  searchAction,
  getDateList,
  form: { getFieldDecorator, validateFields },
}) => {
  const formItemLayout1 = {
    wrapperCol: {
      offset: 15,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onSubmitInfo(values);
      }
    });
  };
  function disabledDate(current) {
    return current && current > moment().endOf('day');
  }
  return (
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="宿舍号">
              {getFieldDecorator('roomCode', {
                initialValue: repair.roomCode,
              })(
                <Input
                  minWidth="200"
                  placeholder="请输入宿舍号"
                  onChange={(value) => {
                    mergeData({ roomCode: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="物品名称/编码">
              {getFieldDecorator('queryString', {
                initialValue: repair.queryString,
              })(
                <Input
                  minWidth="200"
                  placeholder="请输入物品名称/编码"
                  onChange={(value) => {
                    mergeData({ queryString: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="维修日期" style={{ width: '100px' }}>
              {getFieldDecorator('repairDate', {
                initialValue: repair.repairDate || '',
              })(
                <DatePicker.RangePicker
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm:ss"
                  renderExtraFooter={() => (
                    <div style={{ textAlign: 'center', color: '#bfbfbf' }}>
                      请点选两个时间以确定一个时间范围
                    </div>
                  )}
                  disabledDate={disabledDate}
                  onChange={(value) => {
                    mergeData({ visitDate: value });
                    searchAction();
                  }}
                  // showTime={{
                  //   hideDisabledOptions: true,
                  //   defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                  // }}
                  ranges={{
                    前1月: [moment().subtract(1, 'month'), moment()],
                    前15天: [moment().subtract(15, 'day'), moment()],
                    前7天: [moment().subtract(7, 'day'), moment()],
                    前3天: [moment().subtract(3, 'day'), moment()],
                    今天: [moment(), moment()],
                  }}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div className="action-box">
        <Row />
        <Row>
          <Col span={16}>
            <Button
              type="primary"
              onClick={() => {
                mergeData({
                  modalVisible: true,
                  oPty: 'add',
                  roomCode: '',
                  propertyName: '',
                  repairDate: '',
                  remark: '',
                });
                getDateList();
              }}
            >
              添加维修情况
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(RepairSearch);
