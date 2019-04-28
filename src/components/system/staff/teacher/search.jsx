import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import INVENTORY_PERMISSION from '../../../commom/Permission/systemPermission';
import Permission from '../../../commom/Permission/Permission';

const FormItem = Form.Item;
const TeacherSearch = ({
  teacher,
  mergeData,
  onSubmitInfo,
  searchAction,
  getDataList,
  deleteTeacher,
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
            <Col span={8}>
              <FormItem label="搜索条件">
                {getFieldDecorator('queryString', {
                  initialValue: teacher.queryString,
                })(
                  <Input
                    style={{ width: 220 }}
                    placeholder="请输入老师的编号或者姓名"
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
                      teacherCode: '',
                      teacherName: '',
                      teacherSex: '',
                      roleId: '',
                      collegeId: '',
                    });
                    getDataList();
                  }}
                >
                  +新增老师
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
                  <Button
                    type="primary"
                    disabled={teacher.buttonStatus}
                    onClick={() => {
                      deleteTeacher({ deleteTeacherList: teacher.deleteTeacherList });
                    }}
                  >
                    -批量删除老师
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
export default Form.create()(TeacherSearch);
