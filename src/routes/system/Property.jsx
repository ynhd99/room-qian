import { connect } from 'dva';
import React from 'react';
import PropertyList from '../../components/system/property/list';
import PropertySearch from '../../components/system/property/search';
import PropertyModal from '../../components/system/property/modal';

const Property = ({ property, dispatch }) => {
  const propertyList = {
    property,
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
        type: 'property/mergeData',
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
  const propertySearch = {
    property,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'property/mergeData',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: 'property/getGoodsList',
        payload: {},
      });
    },
    exportProperty(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'property/exportProperty',
        payload,
      });
    }
  };
  const propertyModal = {
    property,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'property/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (property.oPty === 'add') {
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
      <PropertySearch {...propertySearch} />
      <PropertyList {...propertyList} />
      <PropertyModal {...propertyModal} />
    </div>
  );
};
function mapStateToProps({ property }) {
  return { property };
}

export default connect(mapStateToProps)(Property);
