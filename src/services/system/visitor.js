import request from '../../utils/request';

export async function addVisitor(params) {
  return request('/api/visitor/addVisitor', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getVisitorList(params) {
  return request('/api/visitor/findVisitorForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateVisitor(params) {
  return request('/api/visitor/updateVisitor', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function exportVisitor(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/visitor/exportVisitor?authToken=${authToken}`;
  window.location.href = url;
}