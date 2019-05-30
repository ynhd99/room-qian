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
export async function exportGoods(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/goods/exportGoods?authToken=${authToken}`;
  window.location.href = url;
}
