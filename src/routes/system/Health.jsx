import { connect } from 'dva';
import React from 'react';
import HealthFilter from '../../components/system/health/search';
import HealthList from '../../components/system/health/list';
import HealthModal from '../../components/system/health/modal';

const Health = ({ health, dispatch }) => {
  const healthFilter = {
    health,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'health/mergeData',
        payload,
      });
    },
    searchAction() {
      console.log('我走了哈');
      dispatch({
        type: 'health/getHealthList',
        payload: {},
      });
    },
    getDateList() {
      dispatch({
        type: 'health/getRoomList',
        payload: {},
      });
    },
    exportHealth(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'health/exportHealth',
        payload,
      });
    }
  };
  const healthList = {
    health,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'health/mergeData',
        payload,
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'health/getHealthList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    getDateList() {
      dispatch({
        type: 'health/getRoomList',
        payload: {},
      });
    },
  };
  const healthModal = {
    health,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'health/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (health.oPty === 'add') {
        dispatch({
          type: 'health/addHealth',
          payload,
        });
      } else {
        console.log('我要修改了');
        dispatch({
          type: 'health/updateHealth',
          payload,
        });
      }
      dispatch({
        type: 'health/mergeData',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  return (
    <div>
      <HealthFilter {...healthFilter} />
      <HealthList {...healthList} />
      <HealthModal {...healthModal} />
    </div>
  );
};
function mapStateToProps({ health }) {
  return { health };
}

export default connect(mapStateToProps)(Health);
