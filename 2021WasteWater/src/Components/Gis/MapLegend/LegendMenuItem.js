import React from 'react';

const LegendMenuItem = ({ name, id, unit, selectedLegend, onClick }) => {
  return (
    <li
      className={selectedLegend === id ? 'legendList on' : 'legendList'}
      id={id}
      onClick={onClick}
    >
      {name}
      <span>{unit}</span>
    </li>
  );
};

export default LegendMenuItem;
