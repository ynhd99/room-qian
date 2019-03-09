import React from 'react';
import { Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;

const DeportBeginSearch = (queryString) => {
  const nameProps = {
    style: { minWidth: 248 },
    onChange({ target: { value } }) {
      // nameChanged(value);
    },
    placeholder: '请输入仓库编码或名称',
    // value: queryString,
  };

  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span="8">
            <FormItem label="仓库名称">
              <Input {...nameProps} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeportBeginSearch;
