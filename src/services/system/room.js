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
export async function getCollegeList(params) {
  console.log(params);
  return request('/api/college/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getClassList(params) {
  console.log(params);
  return request('/api/class/findClassForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getStudentList(params) {
  return request('/api/student/findStudentForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addRoomDetail(params) {
  return request('/api/roomDetail/addRoomDetail', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteRoomDetail(params) {
  return request('/api/roomDetail/deleteRoomDetail', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function exportRoom(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/room/exportRoom?authToken=${authToken}`;
  window.location.href = url;
}
