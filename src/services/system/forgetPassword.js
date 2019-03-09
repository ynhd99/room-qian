import request from '../../utils/request';

export async function getTest1(params) {
  console.log(params);
  return request('/api/user/userLogin', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getForgetPass(params) {
  console.log(params);
  return request('/api/user/userForgetPass', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
