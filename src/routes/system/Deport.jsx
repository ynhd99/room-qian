import { connect } from 'dva';
import React from 'react';
import DeportSearch from '../../components/system/deport/search';
import DeportList from '../../components/system/deport/list';
import DeportModal from '../../components/system/deport/modal';

const Deport = ({ dispatch, deport }) => {
  const searchPropsList = {
    deport,
    mergeData(payload) {
      dispatch({
        type: 'deport/mergeData',
        payload,
      });
    },
    nameChanged(value) {
      dispatch({
        type: 'deport/mergeData',
        payload: {
          queryString: value,
        },
      });
      dispatch({
        type: 'deport/getDeportList',
        payload: {},
      });
    },
  };
  const listPropsList = {
    deport,
    onPageChange(page) {
      dispatch({
        type: 'deport/getDeportList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    updateStatus(value) {
      dispatch({
        type: 'deport/updateStatus',
        payload: {
          id: value.record.id,
          status: value.status,
        },
      });
    },
    delDeport(value) {
      dispatch({
        type: 'deport/deleteDeport',
        payload: {
          id: value.record.id,
        },
      });
    },
    showModal(type, value) {
      console.log('我进来了吗');
      dispatch({
        type: 'deport/mergeData',
        payload: {
          oPty: type,
          deportCode: value.deportCode,
          id: value.id,
          modalVisible: true,
        },
      });
    },
  };
  const modalPropsList = {
    deport,
    mergeData(payload) {
      dispatch({
        type: 'deport/mergeData',
        payload,
      });
    },
    modalHandleOk(value) {
      if (deport.oPty === 'edit') {
        dispatch({
          type: 'deport/updateDeport',
          payload: {
            deportName: value.deportName,
            oPty: '',
          },
        });
      } else {
        dispatch({
          type: 'deport/addDeport',
          payload: {
            deportCode: value.deportCode,
            deportName: value.deportName,
            oPty: '',
          },
        });
      }
      dispatch({
        type: 'deport/mergeData',
        payload: {
          deportCode: '',
          deportName: '',
        },
      });
    },
  };
  return (
    <div>
      <DeportSearch {...searchPropsList} />
      <DeportList {...listPropsList} />
      <DeportModal {...modalPropsList} />
    </div>
  );
};
function mapStateToProps({ deport }) {
  return { deport };
}

export default connect(mapStateToProps)(Deport);
