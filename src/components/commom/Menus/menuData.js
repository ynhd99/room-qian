const SiderMenuList = [
  {
    key: 'sub6',
    name: '个人管理',
    icon: 'icon-cho-message',
    items: [
      {
        key: '/system/room/personal',
        name: '个人信息',
      },
      {
        key: '/system/room/forgetPassword',
        name: '修改密码',
      },
    ],
  },
  {
    key: 'sub0',
    name: '公告管理',
    icon: 'icon-cho-message',
    items: [
      {
        key: '/system/room/record',
        name: '宿舍公告',
      },
    ],
  },
  {
    key: 'sub1',
    name: '系统管理',
    icon: 'icon-cho-set',
    items: [
      {
        key: '/system/room/staff',
        name: '账号设置',
        tabs: [
          {
            key: '/room/student',
            name: '学生信息',
          },
          {
            key: '/room/teacher',
            name: '辅导员信息',
          },
          {
            key: '/room/roomManager',
            name: '宿管员信息',
          },
        ],
      },
      {
        key: '/system/room/role',
        name: '角色权限',
      },
      {
        key: '/system/room/college',
        name: '学院档案',
      },
      {
        key: '/system/room/class',
        name: '班级档案',
      },
      {
        key: '/system/room/building',
        name: '宿舍楼档案',
      },
    ],
  },
  {
    key: 'sub2',
    name: '宿舍管理',
    icon: 'icon-cho-home',
    items: [
      {
        key: '/system/room/category',
        name: '宿舍类别',
      },
      {
        key: '/system/room/room',
        name: '宿舍档案',
      },
      // {
      //   key: '/system/room/roomAllocation',
      //   name: '分配宿舍',
      // },
      {
        key: '/system/room/allocation',
        name: '宿舍分配情况',
      },
    ],
  },
  {
    key: 'sub3',
    name: '公共财产管理',
    icon: 'icon-cho-bill',
    items: [
      {
        key: '/system/room/property',
        name: '公共财产档案',
      },
      {
        key: '/system/room/repair',
        name: '公共财产维修情况',
      },
    ],
  },
  {
    key: 'sub4',
    name: '外来人员管理',
    icon: 'icon-cho-staff',
    items: [
      {
        key: '/system/room/visitor',
        name: '人员登记',
      },
    ],
  },
  {
    key: 'sub5',
    name: '卫生管理',
    icon: 'icon-cho-check',
    items: [
      {
        key: '/system/room/health',
        name: '卫生检查情况',
      },
    ],
  },
];
const HeaderMenuList = [
  {
    key: 'h1',
    name: '个人中心',
  },
];
export default { SiderMenuList, HeaderMenuList };
