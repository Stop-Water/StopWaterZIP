import React from 'react';
import { Link } from 'react-router-dom';

const MenuListItem = ({ icon, name, path, id, selectedMenu }) => {
  return (
    <li className={selectedMenu === id ? 'menuList on' : 'menuList'} id={id}>
      <Link to={path}>
        <div className="menuIcon">{icon}</div>
        <div className="menuName">{name}</div>
      </Link>
    </li>
  );
};

export default MenuListItem;
