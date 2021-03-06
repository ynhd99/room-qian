import { connect } from 'dva';
import React from 'react';
import RoleList from '../../components/system/role/list';
import RoleModal from '../../components/system/role/modal';
import TreeData from '../../components/commom/Menus/authorityTree';

const Role = ({ role, dispatch }) => {
  const RoleLists = {
    role,
    onPageChange(page) {
      dispatch({
        type: 'staff/getRoleList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      console.log(`hahahhahahhahh${payload.id}`);
      dispatch({
        type: 'role/mergeData',
        payload,
      });
    },
    deleteRole(payload) {
      console.log(`hahahhahahhahh${payload.record.id}`);
      dispatch({
        type: 'role/deleteRole',
        payload: { ...payload.record },
      });
    },
  };
  const RoleModalList = {
    role,
    TreeData,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'role/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      console.log(`roleName${payload.roleName}`);
      if (role.oPty === 'add') {
        dispatch({
          type: 'role/addRole',
          payload,
        });
      } else {
        dispatch({
          type: 'role/updateRole',
          payload,
        });
      }
      dispatch({
        type: 'role/mergeData',
        payload: {
          modalVisible: false,
        },
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
