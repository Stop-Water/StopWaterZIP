import React from 'react';

const LegendMenu = ({ id, selectedMap, children }) => {
  return (
    <ul className={id === selectedMap ? 'legendMenu on' : 'legendMenu'} id={id}>
      {children}
    </ul>
  );
};

export default LegendMenu;
