import request from '../../utils/request';

export async function getStaffList(params) {
  return request('/api/staff/findStaffForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addStaff(params) {
  return request('/api/staff/addStaff', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateStaff(params) {
  return request('/api/staff/updateStaff', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteStaff(params) {
  return request('/api/staff/deleteStaff', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function getTeacherList(params) {
  return request('/api/teacher/findTeacherForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addTeacher(params) {
  return request('/api/teacher/addTeacher', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateTeacher(params) {
  return request('/api/teacher/updateTeacher', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function deleteTeacher(params) {
  return request('/api/teacher/deleteTeacher', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
