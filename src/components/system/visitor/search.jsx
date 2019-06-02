import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, DatePicker, Input, Icon, message, Modal, Upload } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const VisitorSearch = ({
  visitor,
  mergeData,
  onSubmitInfo,
  searchAction,
  exportVisitor,
  form: { getFieldDecorator, validateFields },
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
    visible: visitor.errorVisible,
    onOk: handleStatus,
    onCancel: handleStatus,
  };
  const props = {
    name: 'file',
    action: `api/visitor/importVisitor?authToken=${authToken}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange,
    beforeUpload,
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
    <div>
      <Modal {...modelProps}>
        {visitor.errorList.map(item => (
          <p>{item}</p>
       ))}
      </Modal>
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
                    //disabledDate={disabledDate}
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
          </Permission>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.EXPORT.code}>
            <Button
              type="primary"
              onClick={() => {
                exportVisitor({});
              }}exportVisitor
            >
                    导出外来人员登记
                  </Button>
          </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.IMPORT.code}>
            <Upload {...props}>
              <Icon type="upload" /> 导入访问
                  </Upload>
          </Permission>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(VisitorSearch);
