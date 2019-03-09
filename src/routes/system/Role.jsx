import { connect } from 'dva';
import React from 'react';
import RoleList from '../../components/system/role/list';
import RoleModal from '../../components/system/role/modal';

const Role = ({ role, dispatch }) => {
  const RoleLists = {
    role,
    onPageChange(page) {
      dispatch({
        type: 'staff/getStaffList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'role/mergeData',
        payload,
      });
    },
  };
  const RoleModalList = {
    role,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'role/mergeData',
        payload,
      });
    },
  };
  return (
    <div>
      <RoleList {...RoleLists} />
      <RoleModal {...RoleModalList} />
    </div>
  );
};
function mapStateToProps({ role }) {
  return { role };
}

export default connect(mapStateToProps)(Role);
