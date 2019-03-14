import { Tabs } from 'antd';
import { connect } from 'dva';
import React from 'react';
import StudentSearch from '../../components/system/staff/student/search';
import StudentList from '../../components/system/staff/student/list';
import StudentModal from '../../components/system/staff/student/modal';
import TeacherSearch from '../../components/system/staff/teacher/search';
import TeacherList from '../../components/system/staff/teacher/list';
import TeacherModal from '../../components/system/staff/teacher/modal';
import StaffSearch from '../../components/system/staff/staff/search';
import StaffList from '../../components/system/staff/staff/list';
import StaffModal from '../../components/system/staff/staff/modal';

const TabPane = Tabs.TabPane;
const Staff = ({ student, dispatch, teacher, staff }) => {
  const studentSearch = {
    student,
    mergeData(payload) {
      dispatch({
        type: 'student/mergeData',
        payload,
      });
    },
  };
  const studentList = {
    student,
    onPageChange(page) {
      dispatch({
        type: 'student/getStudentList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
  };
  const studentModal = {
    student,
    mergeData(payload) {
      dispatch({
        type: 'student/mergeData',
        payload,
      });
    },
  };
  const teacherSearch = {
    teacher,
    mergeData(payload) {
      dispatch({
        type: 'teacher/mergeData',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: 'teacher/getTeacherList',
        payload: {},
      });
    },
    getDataList() {
      dispatch({
        type: 'teacher/getRoleList',
        payload: {},
      });
      dispatch({
        type: 'teacher/getCollegeList',
        payload: {},
      });
    },
  };
  const teacherList = {
    teacher,
    getDataList() {
      dispatch({
        type: 'teacher/getRoleList',
        payload: {},
      });
      dispatch({
        type: 'teacher/getCollegeList',
        payload: {},
      });
    },
    mergeData(payload) {
      dispatch({
        type: 'teacher/mergeData',
        payload,
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'teacher/getStudentList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    deleteTeacher(payload) {
      dispatch({
        type: 'teacher/deleteTeacher',
        payload,
      });
    },
  };
  const teacherModal = {
    teacher,
    mergeData(payload) {
      dispatch({
        type: 'teacher/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (teacher.oPty === 'add') {
        dispatch({
          type: 'teacher/addTeacher',
          payload,
        });
      } else if (teacher.oPty === 'edit') {
        console.log('好难过啊');
        dispatch({
          type: 'teacher/updateTeacher',
          payload,
        });
      }
    },
  };
  const staffSearch = {
    staff,
    mergeData(payload) {
      dispatch({
        type: 'staff/mergeData',
        payload,
      });
    },
    getRoleList(payload) {
      console.log('我要获取角色信息了');
      dispatch({
        type: 'staff/getRoleList',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: 'staff/getStaffList',
        payload: {},
      });
    },
  };
  const staffList = {
    staff,
    mergeData(payload) {
      dispatch({
        type: 'staff/mergeData',
        payload,
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'staff/getStudentList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    getRoleList(payload) {
      console.log('我要获取角色信息了');
      dispatch({
        type: 'staff/getRoleList',
        payload,
      });
    },
  };
  const staffModal = {
    staff,
    mergeData(payload) {
      dispatch({
        type: 'staff/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (staff.oPty === 'add') {
        dispatch({
          type: 'staff/addStaff',
          payload,
        });
      } else if (staff.oPty === 'edit') {
        console.log('好难过啊');
        dispatch({
          type: 'staff/updateStaff',
          payload,
        });
      }
    },
  };
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="学生信息" key="1">
          <div>
            <StudentSearch {...studentSearch} />
            <StudentList {...studentList} />
            <StudentModal {...studentModal} />
          </div>
        </TabPane>
        <TabPane tab="辅导员信息" key="2">
          <TeacherSearch {...teacherSearch} />
          <TeacherList {...teacherList} />
          <TeacherModal {...teacherModal} />
        </TabPane>
        <TabPane tab="宿管员信息" key="3">
          <StaffSearch {...staffSearch} />
          <StaffList {...staffList} />
          <StaffModal {...staffModal} />
        </TabPane>
      </Tabs>
    </div>
  );
};
function mapStateToProps({ student, teacher, staff }) {
  return { student, teacher, staff };
}

export default connect(mapStateToProps)(Staff);
