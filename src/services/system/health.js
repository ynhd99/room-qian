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
