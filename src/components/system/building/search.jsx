import React from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const FormItem = Form.Item;
const CollegeSearch = ({
  building,
  mergeData,
  onSubmitInfo,
  searchAction,
  getStaffList,
  exportBuilding,
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
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="搜索条件">
              {getFieldDecorator('queryString', {
                initialValue: building.queryString,
              })(
                <Input
                  minWidth="214"
                  placeholder="请输入宿舍楼的编码或者名称"
                  onChange={(value) => {
                    mergeData({ queryString: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                initialValue: building.status || '',
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
                  <Radio.Button value="">全部</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="action-box">
        <Row />
        <Permission path={INVENTORY_PERMISSION.BUILDING_LIST.ADD.code}>
          <Button
            type="primary"
            onClick={() => {
              mergeData({
                modalVisible: true,
                oPty: 'add',
                buildingCode: '',
                buildingName: '',
                staffId: '',
              });
              getStaffList();
            }}
          >
                添加宿舍楼
              </Button>
        </Permission>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Permission path={INVENTORY_PERMISSION.BUILDING_LIST.EXPORT.code}>
          <Button
            type="primary"
            onClick={() => {
              exportBuilding({});
            }}
          >
                    导出宿舍楼信息
                  </Button>
        </Permission>
      </div>
    </div>
  );
};
export default Form.create()(CollegeSearch);
