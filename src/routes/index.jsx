import React from 'react';
import RouterConfig from '../router';
// 系统路由
import Home from './system/Home';
import RoomCate from './system/RoomCate';
import Room from './system/Room';
import Register from './system/Register';
import ForgetPassword from './system/ForgetPassword';
import RegisterResult from './system/RegisterResult';
import ForgetPasswordResult from './system/ForgetPasswordResult';
import Staff from './system/Staff';
import Role from './system/Role';
import College from './system/College';
import Building from './system/Building';
import Allocation from './system/Allocation';
import RoomAllocation from './system/RoomAllocation';
import AllocationDetail from './system/AllocationDetail';
import ClassRoom from './system/ClassRoom';
import Property from './system/Property';
import Visitor from './system/Visitor';
import Record from './system/Record';
import Repair from './system/Repair';
import Health from './system/Health';
import Personal from './system/Personal';

const routes = [
  {
    path: '/system/book/home',
    component: Home,
  },
  {
    path: '/system/room/category',
    component: RoomCate,
  },
  {
    path: '/system/room/room',
    component: Room,
  },
  {
    path: '/system/book/register',
    component: Register,
  },
  {
    path: '/system/book/forgetPassword',
    component: ForgetPassword,
  },
  {
    path: '/system/book/registerResult',
    component: RegisterResult,
  },
  {
    path: '/system/book/forgetPasswordResult',
    component: ForgetPasswordResult,
  },
  {
    path: '/system/room/staff',
    component: Staff,
  },
  {
    path: '/system/room/role',
    component: Role,
  },
  {
    path: '/system/room/college',
    component: College,
  },
  {
    path: '/system/room/building',
    component: Building,
  },
  {
    path: '/system/room/allocation',
    component: Allocation,
  },
  {
    path: '/system/room/roomAllocation',
    component: RoomAllocation,
  },
  {
    path: '/system/room/allocationDetail',
    component: AllocationDetail,
  },
  {
    path: '/system/room/class',
    component: ClassRoom,
  },
  {
    path: '/system/room/property',
    component: Property,
  },
  {
    path: '/system/room/visitor',
    component: Visitor,
  },
  {
    path: '/system/room/record',
    component: Record,
  },
  {
    path: '/system/room/repair',
    component: Repair,
  },
  {
    path: '/system/room/health',
    component: Health,
  },
  {
    path: '/system/room/personal',
    component: Personal,
  },
];
const Router = ({ history, app }) => {
  const routerProps = {
    history,
    app,
    routes,
  };

  return <RouterConfig {...routerProps} />;
};
export default Router;
