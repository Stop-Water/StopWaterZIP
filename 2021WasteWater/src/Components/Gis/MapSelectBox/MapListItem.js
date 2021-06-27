import React from 'react';

const MapListItem = ({ name, id, icon, selectedMap, onClick }) => {
  return (
    <li
      className={selectedMap === id ? 'selectMenuList on' : 'selectMenuList'}
      id={id}
      onClick={onClick}
    >
      <div className="selectIcon">{icon}</div>
      <div className="selectName">{name}</div>
    </li>
  );
};

export default MapListItem;
