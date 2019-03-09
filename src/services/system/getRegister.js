import request from '../../utils/request';

export async function getTest(params) {
  console.log(params);
  return request('/api/user/userLogin', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getRegister(params) {
  console.log(params);
  return request('/api/user/userRegister', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
