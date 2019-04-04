import { connect } from 'dva';
import React from 'react';
import RecordFilter from '../../components/system/record/filter';
import RecordBody from '../../components/system/record/body';
import RecordModal from '../../components/system/record/modal';

const Record = ({ record, dispatch }) => {
  const filterList = {
    record,
    mergeData(payload) {
      dispatch({
        type: 'record/mergeData',
        payload,
      });
    },
  };
  const bodyList = {
    record,
    mergeData(payload) {
      dispatch({
        type: 'record/mergeData',
        payload,
      });
    },
    deleleRecord(payload) {
      console.log(`开始删除了${payload.id}`);
      dispatch({
        type: 'record/deleteRecord',
        payload: { id: payload.id },
      });
    },
  };
  const modalList = {
    record,
    mergeData(payload) {
      dispatch({
        type: 'record/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (record.oPty === 'add') {
        dispatch({
          type: 'record/addRecord',
          payload,
        });
      } else {
        dispatch({
          type: 'record/updateRecord',
          payload,
        });
      }
      dispatch({
        type: 'record/mergeData',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  return (
    <div>
      <RecordFilter {...filterList} />
      <RecordBody {...bodyList} />
      <RecordModal {...modalList} />
    </div>
  );
};
function mapStateToProps({ record }) {
  return { record };
}

export default connect(mapStateToProps)(Record);
