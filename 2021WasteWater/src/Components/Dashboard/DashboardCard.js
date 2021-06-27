import React from 'react';

import './scss/DashboardCard.scss';

const DashboardCard = ({ name, value, unit }) => {
  return (
    <div className="dashboardCardWrap">
      <div className="cardTitle">{name}</div>
      <div className="cardNumBox">
        {/* 위험수치일 때는  warning 클래스명이 추가됩니다.*/}
        <span className={parseInt(value) > 500 ? 'cardNum warning' : 'cardNum'}>
          {value}
        </span>
        {unit}
      </div>
    </div>
  );
};

export default DashboardCard;
