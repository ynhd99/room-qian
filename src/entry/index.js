import dva from 'dva';
import createLoading from 'dva-loading';
import './index.less';
// dva的初始化，可以定义全局的属性
const app = dva({
  onError(error) {
    console.error(error);
  },
});
// 用来加载插件（全局的loading状态插件）
app.use(createLoading());
// 注册model，接收发送的action
app.model(require('../models/app'));
app.model(require('../models/system/home'));
app.model(require('../models/system/deport'));
app.model(require('../models/system/deportBegin'));
app.model(require('../models/system/roomCate'));
app.model(require('../models/system/room'));
app.model(require('../models/system/register'));
app.model(require('../models/system/forgetPassword'));
app.model(require('../models/system/registerResult'));
app.model(require('../models/system/forgetPasswordResult'));
app.model(require('../models/system/staff/student'));
app.model(require('../models/system/staff/teacher'));
app.model(require('../models/system/staff/staff'));
app.model(require('../models/system/role'));
app.model(require('../models/system/college'));
app.model(require('../models/system/building'));
app.model(require('../models/system/allocation'));
app.model(require('../models/system/allocationDetail'));
app.model(require('../models/system/roomAllocation'));
app.model(require('../models/system/class'));
app.model(require('../models/system/property'));
// 添加Router
app.router(require('../routes'));
// start
app.start('#root');
