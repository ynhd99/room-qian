import request from '../../utils/request';

export async function add(params) {
  return request('/api/college/add', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getList(params) {
  return request('/api/college/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
