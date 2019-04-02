import { connect } from 'dva';
import React from 'react';
import VisitorSearch from '../../components/system/visitor/search';
import VisitorList from '../../components/system/visitor/list';
import VisitorModal from '../../components/system/visitor/modal';

const Visitor = ({ visitor, dispatch }) => {
  const visitorList = {
    visitor,
    onPageChange(page) {
      dispatch({
        type: 'property/getStaffList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'visitor/mergeData',
        payload,
      });
    },
    updateStatus(payload) {
      console.log(`我进来了吧${payload.id}`);
      dispatch({
        type: 'property/updateStatus',
        payload: {
          id: payload.id,
          status: payload.status,
        },
      });
    },
    deleteGoods(payload) {
      dispatch({
        type: 'property/deleteGoods',
        payload: {
          id: payload.record.id,
        },
      });
    },
  };
  const visitorSearch = {
    visitor,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'visitor/mergeData',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: 'property/getGoodsList',
        payload: {},
      });
    },
  };
  const visitorModal = {
    visitor,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'visitor/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (visitor.oPty === 'add') {
        dispatch({
          type: 'property/addGoods',
          payload,
        });
      } else {
        dispatch({
          type: 'property/updateGoods',
          payload,
        });
      }
      dispatch({
        type: 'property/mergeData',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  return (
    <div>
      <VisitorSearch {...visitorSearch} />
      <VisitorList {...visitorList} />
      <VisitorModal {...visitorModal} />
    </div>
  );
};
function mapStateToProps({ visitor }) {
  return { visitor };
}

export default connect(mapStateToProps)(Visitor);
