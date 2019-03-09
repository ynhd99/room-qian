import request from '../../utils/request';

export default async function getLogin(params) {
  console.log(params);
  return request('/api/user/userLogin', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addDeport(params) {
  console.log(params);
  return request('/api/deport/addDeport', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
