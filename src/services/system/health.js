import request from '../../utils/request';

export async function addHealth(params) {
  return request('/api/health/addHealth', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getHealthList(params) {
  return request('/api/health/findHealthForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateHealth(params) {
  return request('/api/health/updateHealth', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getRoomList(params) {
  return request('/api/room/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function exportHealth(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/health/exportHealth?authToken=${authToken}`;
  window.location.href = url;
}
