import React from 'react';
import { Form, Input, Row, Col, Button, Radio, Select } from 'antd';

const FormItem = Form.Item;
const ClassSearch = ({
  classRoom,
  mergeData,
  onSubmitInfo,
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
  const filterOption = (inputValue, option) => {
    const props = option.props;
    const qs = props.queryString;
    const reg = new RegExp(inputValue, 'i');
    if (typeof props.children === 'string') {
      return false;
    }
    if (qs && reg.test(qs)) {
      return true;
    }
    return false;
  };
  const collegeOptions =
    classRoom.collegeList &&
    classRoom.collegeList.map(college => (
      <Select.Option
        value={college.id}
        key={college.id}
        queryString={`${college.collegeName} | ${college.collegeCode}`}
      >
        {college.collegeName} | {college.collegeCode}
      </Select.Option>
    ));
  return (
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="搜索条件">
              {getFieldDecorator('queryString', {
                initialValue: classRoom.queryString,
              })(
                <Input
                  minWidth="214"
                  placeholder="请输入班级的编码或者名称"
                  onChange={(value) => {
                    mergeData({ queryString: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: classRoom.collegeId,
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={classRoom.collegeId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ collegeId: value });
                    searchAction();
                  }}
                  placeholder="请选择所属学院"
                >
                  <Select.Option key="" value="">
                    请选择学院
                  </Select.Option>
                  {collegeOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                initialValue: classRoom.status,
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
      <Row>
        <Col span={16}>
          <Button
            type="primary"
            onClick={() => {
              mergeData({ modalVisible: true, oPty: 'add' });
              searchAction();
            }}
          >
            添加班级
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default Form.create()(ClassSearch);
