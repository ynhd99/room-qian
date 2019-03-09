import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import getLogin from '../../services/system/home';
import { saveSession } from '../../utils/index';

export default {
  namespace: 'deportBegin',
  state: {
    loading: false,
    deportList: [],
  },
  subscriptions: {},
  sffects: {},
  reducers: {},
};
