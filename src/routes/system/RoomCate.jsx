import { connect } from 'dva';
import React from 'react';
import CateSearch from '../../components/system/roomCate/search';
import CateList from '../../components/system/roomCate/list';
import CateModal from '../../components/system/roomCate/modal';

const RoomCate = ({ roomCate, dispatch }) => {
  const catePropsSearch = {
    roomCate,
    showModal(type) {
      if (type === 'add') {
        console.log('我又获取了啊');
        dispatch({
          type: 'roomCate/getMaxCode',
          payload: {},
        });
      }
      dispatch({
        type: 'roomCate/mergeData',
        payload: {
          modalVisible: true,
          oPty: type,
        },
      });
    },
    mergeData(payload) {
      dispatch({
        type: 'roomCate/mergeData',
        payload,
      });
    },
    seachAction(payload) {
      dispatch({
        type: 'roomCate/getCateList',
        payload,
      });
    },
  };
  const catePropsList = {
    roomCate,
    mergeData(payload) {
      dispatch({
        type: 'roomCate/mergeData',
        payload,
      });
    },
    showModal(type, record) {
      dispatch({
        type: 'roomCate/mergeData',
        payload: {
          modalVisible: true,
          oPty: type,
          cateCode: record.cateCode,
          cateName: record.cateName,
          cateDesc: record.cateDesc,
          parentId: record.parentId,
          id: record.id,
        },
      });
    },
    deleteRoomCate(payload){
      dispatch({
        type:'roomCate/deleteRoomCate',
        payload,
      })
    },
    updateStatus(payload){
      dispatch({
        type:'roomCate/updateStatus',
        payload,
      })
    }
  };
  const catePropsModal = {
    roomCate,
    mergeData(payload) {
      dispatch({
        type: 'roomCate/mergeData',
        payload,
      });
    },
    modalChange(value) {
      dispatch({
        type: 'roomCate/mergeData',
        payload: {
          parentId: value,
        },
      });
      dispatch({
        type: 'roomCate/getMaxCode',
        payload: {},
      });
    },
    modalHandleOk(payload) {
      dispatch({
        type: 'roomCate/mergeData',
        payload: {
          modalVisible: false,
        },
      });
      // 当是编辑得时候
      if (roomCate.oPty === 'edit') {
        console.log('我走了编辑了');
        dispatch({
          type: 'roomCate/updateRoomCate',
          payload,
        });
      } else {
        dispatch({
          type: 'roomCate/addRoomCate',
          payload,
        });
      }
    },
  };
  return (
    <div>
      <CateSearch {...catePropsSearch} />
      <CateList {...catePropsList} />
      <CateModal {...catePropsModal} />
    </div>
  );
};
function mapStateToProps({ roomCate }) {
  return { roomCate };
}
export default connect(mapStateToProps)(RoomCate);
