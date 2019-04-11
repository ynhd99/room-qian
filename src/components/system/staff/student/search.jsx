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
            <Col span={16}>
              <FormItem label="搜索条件">
                {getFieldDecorator('queryString', {
                  initialValue: student.queryString,
                })(
                  <Input
                    width="260"
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
          <Row>
            <Col span={16}>
              <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.ADD.code}>
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
              </Permission>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(StudentSearch);
