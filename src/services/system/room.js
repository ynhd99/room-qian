import request from '../../utils/request';

export async function getBuildingList(params) {
  console.log(`哈哈${params}`);
  return request('/api/building/findBuildingForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getCateList(params) {
  console.log(params);
  return request('/api/roomCate/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getRoomList(params) {
  console.log(params);
  return request('/api/room/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addRoom(params) {
  console.log(params);
  return request('/api/room/addRoom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateRoom(params) {
  console.log(params);
  return request('/api/room/updateRoom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteRoom(params) {
  console.log(params);
  return request('/api/room/deleteRoom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
