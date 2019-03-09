import React from 'react';
import Menus from '../Menus';

const Sider = ({ SiderMenuList, isShow }) => {
  console.log(`ahahha${SiderMenuList}`);
  const menusProps = {
    SiderMenuList,
  };
  if (isShow) {
    return (
      <div className="sider-box">
        <Menus {...menusProps} />
      </div>
    );
  }
  return null;
};

export default Sider;
