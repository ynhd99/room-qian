import request from '../../utils/request';

export async function addGoods(params) {
  return request('/api/goods/addGoods', {
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
export async function updateGoods(params) {
  return request('/api/goods/updateGoods', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteGoods(params) {
  return request('/api/goods/deleteGoods', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
