import React from 'react';
import { Form, Input, Row, Col, Button, Radio, Upload, Icon, message, Modal } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const FormItem = Form.Item;
const CollegeSearch = ({
  college,
  mergeData,
  onSubmitInfo,
  nameChanged,
  searchAction,
  exportCollege,
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
    visible: college.errorVisible,
    onOk: handleStatus,
    onCancel: handleStatus,
  };
  const props = {
    name: 'file',
    action: `api/college/importCollege?authToken=${authToken}`,
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
  const nameProps = {
    style: { minWidth: 248 },
    onChange({ target: { value } }) {
      nameChanged(value);
    },
    placeholder: '请输入分类编码或名称',
    value: college.queryString,
  };

  return (
    <div>
      <Modal {...modelProps}>
        {college.errorList.map(item => (
          <p>{item}</p>
       ))}
      </Modal>
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
          <Permission path={INVENTORY_PERMISSION.COLLEGE_LIST.ADD.code}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true, oPty: 'add' })}>
                添加学院
              </Button>
          </Permission>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.COLLEGE_LIST.EXPORT.code}>
            <Button
              type="primary"
              onClick={() => {
                exportCollege({});
              }}
            >
                    导出学院信息
                  </Button>
          </Permission>
                &nbsp;&nbsp;&nbsp;&nbsp;
          <Permission path={INVENTORY_PERMISSION.COLLEGE_LIST.IMPORT.code}>
            <Upload {...props}>
              <Icon type="upload" /> 导入学院
                  </Upload>
          </Permission>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(CollegeSearch);
