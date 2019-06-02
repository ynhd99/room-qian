import { connect } from 'dva';
import React from 'react';
import RepairFilter from '../../components/system/repair/filter';
import RepairList from '../../components/system/repair/list';
import RepairModal from '../../components/system/repair/modal';

const Repair = ({ repair, dispatch }) => {
  const repairFilter = {
    repair,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'repair/mergeData',
        payload,
      });
    },
    searchAction() {
      console.log('我走了哈');
      dispatch({
        type: 'repair/getRepairList',
        payload: {},
      });
    },
    getDateList() {
      dispatch({
        type: 'repair/getRoomList',
        payload: {},
      });
      dispatch({
        type: 'repair/getGoodsList',
        payload: {},
      });
    },
    exportRepair(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'repair/exportRepair',
        payload,
      });
    }
  };
  const repairList = {
    repair,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'repair/mergeData',
        payload,
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'staff/getRepairList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    getDateList() {
      dispatch({
        type: 'repair/getRoomList',
        payload: {},
      });
      dispatch({
        type: 'repair/getGoodsList',
        payload: {},
      });
    },
    updateStatus(payload) {
      dispatch({
        type: 'repair/updateStatus',
        payload,
      });
    },
    updateRepair(payload) {
      dispatch({
        type: 'repair/updateRepair',
        payload,
      });
    },
  };
  const repairModal = {
    repair,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'repair/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (repair.oPty === 'add') {
        dispatch({
          type: 'repair/addRepair',
          payload,
        });
      } else {
        console.log('我要修改了');
        dispatch({
          type: 'repair/updateRepair',
          payload,
        });
      }
      dispatch({
        type: 'repair/mergeData',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  return (
    <div>
      <RepairFilter {...repairFilter} />
      <RepairList {...repairList} />
      <RepairModal {...repairModal} />
    </div>
  );
};
function mapStateToProps({ repair }) {
  return { repair };
}

export default connect(mapStateToProps)(Repair);
