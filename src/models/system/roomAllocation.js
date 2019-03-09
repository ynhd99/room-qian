import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import getLogin from '../../services/system/home';
import { saveSession } from '../../utils/index';

export default {
  namespace: 'roomAllocation',
  state: {
    roomCode: '',
    cateName: '',
    buildingName: '',
    className: '',
    status: '',
    modalVisible: false,
    cateId: '',
    treeData: [],
    dataList: [],
    queryString: '',
    pageType: '',
    buildingId: '',
  },
  subscriptions: {},
  effects: {
    // 跳转控制
    * routerGo({ payload }, { put }) {
      const path = payload.path;
      yield put(routerRedux.push(path));
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
