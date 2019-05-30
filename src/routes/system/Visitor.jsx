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
        type: 'visitor/getVisitorList',
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
    updateVisitor(payload) {
      console.log(`我进来了吧${payload.id}`);
      dispatch({
        type: 'visitor/updateVisitor',
        payload,
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
        type: 'visitor/getVisitorList',
        payload: {},
      });
    },
    exportVisitor(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'visitor/exportVisitor',
        payload,
      });
    }
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
          type: 'visitor/addVisitor',
          payload,
        });
      } else {
        dispatch({
          type: 'visitor/updateVisitor',
          payload,
        });
      }
      dispatch({
        type: 'visitor/mergeData',
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
