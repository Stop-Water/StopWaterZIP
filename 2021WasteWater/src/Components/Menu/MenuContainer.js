import React from 'react';

const MenuContainer = ({ kind, selectedMenu, children }) => {
  return (
    <div
      className={
        kind === 'main'
          ? 'menuContainer1'
          : selectedMenu === 'admin'
          ? 'menuContainer2 on'
          : 'menuContainer2'
      }
    >
      {children}
    </div>
  );
};

export default MenuContainer;
