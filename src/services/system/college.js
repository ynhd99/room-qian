import request from '../../utils/request';

export async function add(params) {
  return request('/api/college/add', {
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
export async function updateStatus(params) {
  return request('/api/college/updateStatus', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteCollege(params) {
  return request('/api/college/delete', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function update(params) {
  return request('/api/college/update', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
