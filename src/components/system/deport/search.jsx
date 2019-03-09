import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

const DeportBeginSearch = ({ mergeData, nameChanged }) => {
  const nameProps = {
    style: { minWidth: 240 },
    onChange({ target: { value } }) {
      nameChanged(value);
    },
    placeholder: '请输入仓库编码或名称',
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
          <Col span={8}>
            <Button
              type="primary"
              onClick={() => mergeData({ modalVisible: true, title: '添加仓库' })}
            >
              添加仓库
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeportBeginSearch;
