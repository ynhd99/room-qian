import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

const CateSearch = ({ queryString, showModal }) => {
  const nameProps = {
    style: { minWidth: 248 },
    onChange({ target: { value } }) {
      // nameChanged(value);
    },
    placeholder: '请输入分类编码或名称',
    // value: queryString,
  };

  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem label="分类名称">
              <Input {...nameProps} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={() => showModal('add')}>
              添加分类
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CateSearch;
