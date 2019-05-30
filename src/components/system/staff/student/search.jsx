import React from 'react';
import { Form, Input, Row, Col, Button, Upload, Icon, message, Modal } from 'antd';
import INVENTORY_PERMISSION from '../../../commom/Permission/systemPermission';
import Permission from '../../../commom/Permission/Permission';

const FormItem = Form.Item;
const StudentSearch = ({
  student,
  mergeData,
  onSubmitInfo,
  getDataList,
  searchAction,
  deleteStudent,
  exportStudent,
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
    visible: student.errorVisible,
    onOk: handleStatus,
    onCancel: handleStatus,
  };
  const props = {
    name: 'file',
    action: `api/student/importStudent?authToken=${authToken}`,
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
        {student.errorList.map(item => (
          <p>{item}</p>
       ))}
      </Modal>
      <div className="components-search">
        <Form layout="inline" onSubmit={handleSubmit}>
          <Row>
            <Col span={24}>
              <FormItem label="搜索条件">
                {getFieldDecorator('queryString', {
                  initialValue: student.queryString,
                })(
                  <Input
                    style={{ width: 220 }}
                    placeholder="请输入学生的编号或者姓名"
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
                      studentCode: '',
                      studentName: '',
                      studentPhone: '',
                      collegeId: '',
                      classId: '',
                      roleId: '',
                      studentSex: '',
                    });
                    getDataList();
                  }}
                >
                  +新增学生
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Button
                    type="primary"
                    disabled={student.buttonStatus}
                    onClick={() => {
                      deleteStudent({ deleteStudentList: student.deleteStudentList });
                    }}
                  >
                    -批量删除学生
                  </Button>
                </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Button
                    type="primary"
                    onClick={() => {
                      exportStudent({});
                    }}
                  >
                    导出学生
                  </Button>
                </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Upload {...props}>
                    <Icon type="upload" /> 导入学生
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
export default Form.create()(StudentSearch);
