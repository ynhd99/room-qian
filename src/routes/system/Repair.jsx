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
        type: 'staff/getStaffList',
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
