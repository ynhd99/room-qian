import request from '../../utils/request';

export async function addRecord(params) {
  return request('/api/record/addRecord', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getRecordList(params) {
  return request('/api/record/findRecordList', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateRecord(params) {
  return request('/api/record/updateRecord', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteRecord(params) {
  return request('/api/record/deleteRecord', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
