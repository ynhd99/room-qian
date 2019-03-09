import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import getLogin from '../../services/system/home';
import { saveSession } from '../../utils/index';

export default {
  namespace: 'room',
  state: {
    roomCode: '',
    cateName: '',
    buildingName: '',
    status: '',
    modalVisible: false,
    cateId: '',
    treeData: [],
    queryString: '',
    oPty: '',
    buildingId: ''
  },
  subscriptions: {},
  effects: {},
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
    }
  }
};
