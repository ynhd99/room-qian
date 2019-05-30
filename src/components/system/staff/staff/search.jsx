import React from 'react';
import { Form, Input, Row, Col, Button, Upload, Icon, message, Modal } from 'antd';
import INVENTORY_PERMISSION from '../../../commom/Permission/systemPermission';
import Permission from '../../../commom/Permission/Permission';

const FormItem = Form.Item;
const StaffSearch = ({
  staff,
  mergeData,
  onSubmitInfo,
  getRoleList,
  searchAction,
  deleteStaff,
  exportStaff,
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
    visible: staff.errorVisible,
    onOk: handleStatus,
    onCancel: handleStatus,
  };
  const props = {
    name: 'file',
    action: `api/staff/importStaff?authToken=${authToken}`,
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
  return (
    <div>
      <Modal {...modelProps}>
        {staff.errorList.map(item => (
          <p>{item}</p>
       ))}
      </Modal>
      <div className="components-search">
        <Form layout="inline" onSubmit={handleSubmit}>
          <Row>
            <Col span={8}>
              <FormItem label="搜索条件">
                {getFieldDecorator('queryString', {
                  initialValue: staff.queryString,
                })(
                  <Input
                    style={{ width: 220 }}
                    placeholder="请输入宿管员编号或者姓名"
                    onChange={(value) => {
                      mergeData({ queryString: value.target.value });
                      searchAction();
                    }}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="action-box" style={{ marginTop: '15px' }}>
          <Row />
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.ADD.code}>
            <Row>
              <Col span={16}>
                <Button
                  type="primary"
                  onClick={() => {
                    mergeData({
                      modalVisible: true,
                      oPty: 'add',
                      staffCode: '',
                      staffName: '',
                      staffPhone: '',
                      staffSex: '',
                      roleId: '',
                    });
                    getRoleList();
                  }}
                >
                  +新增宿管员
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Button
                    type="primary"
                    disabled={staff.buttonStatus}
                    onClick={() => {
                      deleteStaff({ deleteStaffList: staff.deleteStaffList });
                    }}
                  >
                    -批量删除宿管员
                  </Button>
                </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Button
                    type="primary"
                    onClick={() => {
                      exportStaff({});
                    }}
                  >
                    导出宿管员信息
                  </Button>
                </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Upload {...props}>
                    <Icon type="upload" /> 导入宿管员
                  </Upload>
                </Permission>
              </Col>
            </Row>
          </Permission>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(StaffSearch);
