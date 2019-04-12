import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, DatePicker, Input } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const VisitorSearch = ({
  visitor,
  mergeData,
  onSubmitInfo,
  searchAction,
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
            <FormItem label="搜索条件">
              {getFieldDecorator('visitorName', {
                initialValue: visitor.visitorName,
              })(
                <Input
                  minWidth="220"
                  placeholder="请输入到访人姓名"
                  onChange={(value) => {
                    mergeData({ visitorName: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label="到访时间">
              {getFieldDecorator('visitDate', {
                initialValue: visitor.visitDate || '',
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
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
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
        <Permission path={INVENTORY_PERMISSION.VISITE_LIST.ADD.code}>
          <Row>
            <Col span={16}>
              <Button
                type="primary"
                onClick={() =>
                  mergeData({
                    modalVisible: true,
                    oPty: 'add',
                    visitorName: '',
                    identityCode: '',
                    phoneNumber: '',
                    receptName: '',
                    startTime: '',
                    endTime: '',
                    remark: '',
                  })
                }
              >
                添加访客信息
              </Button>
            </Col>
          </Row>
        </Permission>
      </div>
    </div>
  );
};
export default Form.create()(VisitorSearch);
