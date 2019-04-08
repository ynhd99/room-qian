import request from '../../utils/request';

export async function addRepair(params) {
  return request('/api/repair/addRepair', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getRepairList(params) {
  return request('/api/repair/findRepairForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateRepair(params) {
  return request('/api/repair/updateRepair', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getGoodsList(params) {
  return request('/api/goods/findGoodsForPage', {
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
