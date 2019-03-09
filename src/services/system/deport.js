import request from '../../utils/request';

export async function getDeportList(params) {
  console.log(`哈哈${params}`);
  return request('/api/room/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addDeport(params) {
  console.log(params);
  return request('/api/room/addRoom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateStatus(params) {
  console.log(params);
  return request('/api/room/updateStatus', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteDeport(params) {
  console.log(params);
  return request('/api/room/deleteRoom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateDeport(params) {
  console.log(params);
  return request('/api/room/update', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
