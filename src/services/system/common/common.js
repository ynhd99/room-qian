import request from '../../../utils/request';

export async function getRoleList(params) {
  return request('/api/authority/role', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getList(params) {
  return request('/api/college/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getCollegeList(params) {
  return request('/api/college/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getClassList(params) {
  return request('/api/class/findClassForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getBuildingList(params) {
  return request('/api/building/findBuildingForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getRoomList(params) {
  return request('/api/room/findRoomList', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getStudentList(params) {
  return request('/api/roomDetail/findRoomDetailForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addRole(params) {
  return request('/api/authority/addRole', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getAuthorityList(params) {
  return request('/api/authority/getAuthorityList', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateRole(params) {
  return request('/api/authority/updateRole', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteRole(params) {
  return request('/api/authority/deleteRole', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
