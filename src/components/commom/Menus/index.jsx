import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

const Menus = ({ SiderMenuList }) => {
  console.log(SiderMenuList);
  // 递归生成菜单
  const getMenus = SiderMenuList =>
    SiderMenuList.map((menu) => {
      if (menu.items) {
        return (
          <Menu.SubMenu
            key={menu.key}
            title={
              <span>
                {menu.icon && <i className={`iconfont ${menu.icon}`} />}
                {menu.name}
              </span>
            }
          >
            {getMenus(menu.items)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={menu.key}>
          <Link to={menu.key} style={{ fontSize: '14px' }}>
            {menu.icon && <i className={`iconfont ${menu.icon}`} />}
            {menu.name}
          </Link>
        </Menu.Item>
      );
    });
  const menuItems = getMenus(SiderMenuList);
  return (
    <div
      className="page-side-menu"
      ref={(e) => {
        const menuNode = e;
        if (menuNode) {
          menuNode.childNodes[0].scrollTop = window.menuScroll || 0;
        }
      }}
    >
      <Menu mode={'inline'} theme={'light'} defaultSelectedKeys={['sub1']}>
        {menuItems}
      </Menu>
    </div>
  );
};
export default Menus;
