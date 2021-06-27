import React from 'react';

const InfoItem = ({ icon, name, value, unit }) => {
  return (
    <li className="tableRow">
      <div className="tableLeft">
        {icon}
        <span>{name}</span>
      </div>
      <div className="tableRigth">{value + unit}</div>
    </li>
  );
};

export default InfoItem;
