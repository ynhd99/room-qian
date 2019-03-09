---
order: 2
title:
  zh-CN: 分页选择
  en-US: pagination
---

## zh-CN

- 分页仅需要在fetch时传入页码字段即可
- 可以通过pageChange来检测页码变化情况

## en-US

````jsx
import { ImgPickerModal } from 'hermes-react';
import { Button } from 'antd';
let pageUploadId = 0;
// document.domain = 'alipay.net';
const updatedFiles = [];
const PhotoUploader = React.createClass({
  getInitialState() {
    this.update = null;
    return {
      showPhotoView: false,
      pagination: {
        current: 1,
        pageSize: 21,// 21个的时候可以撑满一页
        total: 200,
      }
    }
  },

  componentDidMount() {
    setTimeout(() => {
      this.fetchData(this.state.pagination);
    }, 200);
  },

  hideModal() {
    this.setState({ showPhotoView: false });
  },

  addFiles(files) {
    console.info(files);
    this.hideModal();
  },

  pageChange(num) {
    setTimeout(() => {
      this.fetchData({ ...this.state.pagination, current: num });
    }, 400);
  },

  fetchData(pagination) {
     const data = this.getData(pagination.pageSize, pagination.current);
    this.update(data, { ...pagination });
  },

  getData(num = 200, pageNum) {
    const examplePics = ['http://zos.alipayobjects.com/rmsportal/KmbGeLULGnZfCIFRabuH.png', 'http://zos.alipayobjects.com/rmsportal/VqLgauWQkaPyIsjZrSHy.jpeg',
    'https://gw.alipayobjects.com/zos/rmsportal/OLSNFSycERsdqidvLtTh.jpg',
    'https://gw.alipayobjects.com/zos/rmsportal/zraeuQGxkWiKBJBZhTyj.jpg',
    'https://gw.alipayobjects.com/zos/rmsportal/dYgYRotzMxzvqoXMKoLY.jpg'];
    const pics = [];
    for(let i = 0; i < num; i++) { // 必须要保证每页id唯一
      pics.push({id: Date.now() + i, thumbUrl: examplePics[parseInt(Math.random()*10/2)]});
    }
    if (pageNum === 1) { // 注意，服务端需要将上传过的图片放入第一页里，否则就很难找到选择的图片
      return [...updatedFiles, ...pics].slice(0, num);
    }
    return pics;
  },

  render() {
    const { showPhotoView } = this.state;

    return (<div>
      <Button type="primary" onClick={() => { this.setState({showPhotoView: true}); }}>选择图片</Button>
      <ImgPickerModal
        title="分页上传"
        limitInfo="一次最多可添加5个图片"
        notice="图片可以上传内景照（如包间、大厅、特色附加设施）或外景照（如店外有花园、临湖等特色环境）"
        uploadNotice={<div>
          <div>上传按钮</div>
          <div>上传图片按钮提示文案</div>
        </div>}
        visible={showPhotoView}
        max={5}
        min={1}
        fetch={(cb) => {
          this.update = cb;
        }}
        onOk={this.addFiles}
        onPageChange={(num) => { this.pageChange(num); }}
        onCancel={this.hideModal}
        onChange={(file) => { console.log(file); }}

        chooseUpload
        uploadUrl="./upload.do"
        beforeUpload={(file) => { console.log('before', file); return true; }}
        uploadChange={(file) => { console.log('change', file);
        const item = {id: pageUploadId++, thumbUrl: 'https://zos.alipayobjects.com/rmsportal/CTpVbbrZlZMPEgHmdIAo.png'};
        updatedFiles.push(item);
        return  {success: true, data: item}}}
      /></div>);
  },
})

ReactDOM.render(<PhotoUploader />, mountNode);
````
