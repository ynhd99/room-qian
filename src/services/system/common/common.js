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
