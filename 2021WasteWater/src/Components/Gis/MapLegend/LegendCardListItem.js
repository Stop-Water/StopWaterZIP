import React from 'react';

const LegendCardListItem = ({ unit, value, icon }) => {
  return (
    <li className="tableRow">
      <div className="tableLeft">
        {icon}
        <span>{unit}</span>
      </div>
      <div className="tableRigth">{value}</div>
    </li>
  );
};

export default LegendCardListItem;
