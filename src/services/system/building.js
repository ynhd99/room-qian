import request from '../../utils/request';

export async function getBuildingList(params) {
  return request('/api/building/findBuildingForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addBuilding(params) {
  return request('/api/building/addBuilding', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateBuilding(params) {
  return request('/api/building/updateBuilding', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteBuilding(params) {
  return request('/api/building/deleteBuilding', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function exportBuilding() {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/building/exportBuilding?authToken=${authToken}`;
  window.location.href = url;
}
