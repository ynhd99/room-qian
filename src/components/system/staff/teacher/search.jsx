import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const TeacherSearch = ({
  teacher,
  mergeData,
  onSubmitInfo,
  searchAction,
  getDataList,
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
                    width="214"
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
          <Row>
            <Col span={16}>
              <Button
                type="primary"
                onClick={() => {
                  mergeData({ modalVisible: true, oPty: 'add' });
                  getDataList();
                }}
              >
                +新增老师
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(TeacherSearch);
