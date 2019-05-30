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
export async function exportCollege(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/college/exportCollege?authToken=${authToken}`;
  window.location.href = url;
}
