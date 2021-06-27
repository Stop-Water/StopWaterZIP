import React from 'react';
import { Link } from 'react-router-dom';

const AdminMenuListItem = ({ name, id, path, selectedAdminMenu }) => {
  return (
    <li
      className={selectedAdminMenu === id ? 'menuList on' : 'menuList'}
      id={id}
    >
      <Link to={path}>{name}</Link>
    </li>
  );
};

export default AdminMenuListItem;
