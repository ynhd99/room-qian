import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, DatePicker, Input } from 'antd';

const FormItem = Form.Item;
const HealthSearch = ({
  health,
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
                initialValue: health.roomCode,
              })(
                <Input
                  style={{ minWidth: 200 }}
                  placeholder="请输入宿舍号"
                  onChange={(value) => {
                    mergeData({ roomCode: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label="检查日期">
              {getFieldDecorator('rangeDate', {
                initialValue: health.rangeDate || '',
              })(
                <DatePicker.RangePicker
                  style={{ minWidth: 150 }}
                  allowClear={false}
                  format="YYYY-MM-DD"
                  renderExtraFooter={() => (
                    <div style={{ textAlign: 'center', color: '#bfbfbf' }}>
                      请点选两个时间以确定一个时间范围
                    </div>
                  )}
                  disabledDate={disabledDate}
                  onChange={(value) => {
                    mergeData({ rangeDate: value });
                    searchAction();
                  }}
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
                  roomId: '',
                  checkDate: '',
                  remark: '',
                });
                getDateList();
              }}
            >
              添加卫生检查情况
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(HealthSearch);
