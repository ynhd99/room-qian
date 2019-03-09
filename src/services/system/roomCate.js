import request from '../../utils/request';

export async function getCateList(params) {
  return request('/api/roomCate/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addRoomCate(params) {
  return request('/api/roomCate/addRoomCate', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getMaxCode(params) {
  return request('/api/roomCate/getMaxCode', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateRoomCate(params) {
  return request('/api/roomCate/updateRoomCate', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
