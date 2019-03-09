import request from '../utils/request';

export async function getTest1(params) {
  console.log(params);
  return request('/api/user/userLogin', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function userLogout(params) {
  console.log(params);
  return request('/api/user/userLogout', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
