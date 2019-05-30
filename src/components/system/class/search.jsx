import React from 'react';
import { Form, Input, Row, Col, Button, Radio, Select, Upload, Icon, message, Modal } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const FormItem = Form.Item;
const ClassSearch = ({
  classRoom,
  mergeData,
  onSubmitInfo,
  searchAction,
  exportClass,
  form: { getFieldDecorator, validateFields },
}) => {
  const authToken = window.sessionStorage.getItem('token');
  const onChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      console.log(info.file.response.uploadStatus);
      if (!info.file.response.uploadStatus) {
        console.log('愁死我了  你到底是个啥');
        mergeData({ errorVisible: true, errorList: info.file.response.errorList });
      } else {
        message.success(`已成功导入${info.file.response.importMsg}条数据`);
        searchAction();
      }
    } else if (info.file.status === 'error') {
      message.error('导入失败');
    }
  };
  const beforeUpload = (file) => {
    const arr = ['', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const isImg = arr.indexOf(file.type) !== -1;
    if (!isImg) {
      message.error('请上传 xlsx ,xls 格式的文件');
    }
    return isImg;
  };
  const handleStatus = () => {
    mergeData({ errorVisible: false });
    searchAction();
  };
  const modelProps = {
    title: '导入错误信息',
    visible: classRoom.errorVisible,
    onOk: handleStatus,
    onCancel: handleStatus,
  };
  const props = {
    name: 'file',
    action: `api/class/importClass?authToken=${authToken}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange,
    beforeUpload,
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
    const prop = option.props;
    const qs = prop.queryString;
    const reg = new RegExp(inputValue, 'i');
    if (typeof prop.children === 'string') {
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
    <div>
      <Modal {...modelProps}>
        {classRoom.errorList.map(item => (
          <p>{item}</p>
       ))}
      </Modal>
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
        <Permission path={INVENTORY_PERMISSION.CLASS_LIST.ADD.code}>
          <Button
            type="primary"
            onClick={() => {
              mergeData({ modalVisible: true, oPty: 'add' });
              searchAction();
            }}
          >
              添加班级
            </Button>
        </Permission>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
          <Button
            type="primary"
            onClick={() => {
              exportClass({});
            }}
          >
                    导出班级信息
                  </Button>
        </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
        <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.DELETE.code}>
          <Upload {...props}>
            <Icon type="upload" /> 导入班级
                  </Upload>
        </Permission>
      </div>
    </div>
  );
};
export default Form.create()(ClassSearch);
