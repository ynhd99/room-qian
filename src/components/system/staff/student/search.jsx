import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
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
  form: { getFieldDecorator, validateFields },
}) => {
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
              </Col>
            </Row>
          </Permission>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(StudentSearch);
