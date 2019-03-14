import React from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';

const FormItem = Form.Item;
const CollegeSearch = ({
  college,
  mergeData,
  onSubmitInfo,
  nameChanged,
  searchAction,
  form: { getFieldDecorator, validateFields },
}) => {
  const formItemLayout1 = {
    wrapperCol: {
      span: 18,
      offset: 6,
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
  const nameProps = {
    style: { minWidth: 248 },
    onChange({ target: { value } }) {
      nameChanged(value);
    },
    placeholder: '请输入分类编码或名称',
    value: college.queryString,
  };

  return (
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="搜索条件">
              {getFieldDecorator('queryString', {
                initialValue: college.queryString,
              })(<Input {...nameProps} />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                initialValue: college.status,
              })(
                <Radio.Group
                  style={{ minWidth: 215 }}
                  onChange={(value) => {
                    mergeData({ status: value.target.value });
                    searchAction();
                  }}
                >
                  <Radio.Button value="0">开启</Radio.Button>
                  <Radio.Button value="1">停用</Radio.Button>
                  <Radio.Button value="2">全部</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="action-box" style={{ marginTop: '15px' }}>
        <Row />
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true, oPty: 'add' })}>
              添加学院
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(CollegeSearch);
