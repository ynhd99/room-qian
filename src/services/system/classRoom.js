import request from '../../utils/request';

export async function addClass(params) {
  return request('/api/class/addClass', {
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
export async function updateClass(params) {
  return request('/api/class/updateClass', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteClass(params) {
  return request('/api/class/deleteClass', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
