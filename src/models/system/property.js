import { message } from 'antd';
import { parse } from 'qs';
import { getGoodsList, addGoods, updateGoods, deleteGoods,exportGoods } from '../../services/system/property';

export default {
  namespace: 'property',
  state: {
    loading: false,
    goodsList: [],
    modalVisable: false,
    // 物品名称
    goodsName: '',
    // 学院代码
    goodsCode: '',
    // 模糊查询字段
    queryString: '',
    // 状态
    status: '',
    id: '',
    // 分页
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/room/property') {
          console.log('哈哈哈');
          dispatch({
            type: 'getGoodsList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getGoodsList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { status, queryString, pagination } = yield select(state => state.property);
      payload.queryString = queryString;
      payload.status = status;
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getGoodsList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            goodsList: res.data.data.list,
            pagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              total: res.data.data.total,
              current: res.data.data.pageNum,
              showTotal: total => `共 ${total} 条`,
              pageSize: res.data.data.pageSize,
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
      yield put({ type: 'hideLoading' });
    },
    //导出物品信息
    * exportProperty({ payload },{ call }) {
      console.log("bdwuiedheufherufhrufhru");
      yield call(exportGoods, {payload});
    },
    * addGoods({ payload }, { call, put }) {
      console.log(`还没有吗${payload.classCode}`);
      const res = yield call(addGoods, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'mergeData', payload: { collegeId: '' } });
        yield put({ type: 'getGoodsList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateGoods({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.property);
      payload.id = id;
      const res = yield call(updateGoods, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'mergeData', payload: { collegeId: '' } });
        yield put({ type: 'getGoodsList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteGoods({ payload }, { call, put }) {
      const res = yield call(deleteGoods, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getGoodsList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateStatus({ payload }, { call, put }) {
      const res = yield call(updateGoods, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getGoodsList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    updateState(state, payload) {
      return { ...state, ...payload };
    },
    mergeData(state, action) {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
};
