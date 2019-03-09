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
