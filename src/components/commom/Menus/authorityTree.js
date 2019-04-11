const treeData = [
  {
    title: ' 公告管理',
    key: '600000',
    children: [
      {
        title: '宿舍公告',
        key: '6000001',
        children: [{ title: '添加', key: '60000011' }, { title: '删除/编辑', key: '60000012' }],
      },
    ],
  },
  {
    title: '系统管理',
    key: '610000',
    children: [
      {
        title: '账号设置',
        key: '6100001',
        children: [{ title: '添加', key: '61000011' }, { title: '删除/编辑', key: '61000012' }],
      },
      {
        title: '角色权限',
        key: '6100002',
        children: [{ title: '添加', key: '61000021' }, { title: '删除/编辑', key: '61000022' }],
      },
      {
        title: '学院档案',
        key: '6100003',
        children: [
          { title: '添加', key: '61000031' },
          { title: '删除/编辑/启用/停用', key: '61000033' },
        ],
      },
      {
        title: '班级档案',
        key: '6100004',
        children: [
          { title: '添加', key: '61000041' },
          { title: '删除/编辑/启用/停用', key: '61000042' },
        ],
      },
      {
        title: '宿舍楼档案',
        key: '6100005',
        children: [
          { title: '添加', key: '61000051' },
          { title: '删除/编辑/启用/停用', key: '61000052' },
        ],
      },
    ],
  },
  {
    title: ' 宿舍管理',
    key: '620000',
    children: [
      {
        title: '宿舍类别',
        key: '6200001',
        children: [
          { title: '添加', key: '62000011' },
          { title: '删除/编辑/停用/启用', key: '62000012' },
        ],
      },
      {
        title: '宿舍档案',
        key: '6200002',
        children: [
          { title: '添加', key: '62000021' },
          { title: '删除/编辑/停用/启用', key: '62000022' },
        ],
      },
    ],
  },
  {
    title: ' 公共财产管理',
    key: '630000',
    children: [
      {
        title: '宿舍类公共财产档案',
        key: '6300001',
        children: [
          { title: '添加', key: '63000011' },
          { title: '删除/编辑/停用/启用', key: '63000012' },
        ],
      },
      {
        title: '宿舍类公共财产维修情况',
        key: '6300002',
        children: [{ title: '添加', key: '63000021' }, { title: '编辑', key: '63000022' }],
      },
    ],
  },
  {
    title: ' 外来人员管理',
    key: '640000',
    children: [
      {
        title: '人员登记',
        key: '6400001',
        children: [{ title: '添加', key: '64000011' }, { title: '删除/编辑', key: '64000012' }],
      },
    ],
  },
  {
    title: ' 卫生管理',
    key: '650000',
    children: [
      {
        title: '卫生检查情况',
        key: '6500001',
        children: [{ title: '添加', key: '65000011' }, { title: '编辑', key: '65000012' }],
      },
    ],
  },
];
export default treeData;
