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
export async function exportStaff(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/staff/exportStaff?authToken=${authToken}`;
  window.location.href = url;
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
export async function exportTeacher(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/teacher/exportTeacher?authToken=${authToken}`;
  window.location.href = url;
}
export async function getStudentList(params) {
  return request('/api/student/findStudentForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function addStudent(params) {
  return request('/api/student/addStudent', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function updateStudent(params) {
  return request('/api/student/updateStudent', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function deleteStudent(params) {
  return request('/api/student/deleteStudent', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function exportStudent(params) {
  // 导出
  // let studentInfo = `{"id":"${params.payload.id}"}`;
  // studentInfo = encodeURIComponent(studentInfo);
  const authToken = window.sessionStorage.getItem('token');
  const url = `/api/student/exportStudent?authToken=${authToken}`;
  window.location.href = url;
}