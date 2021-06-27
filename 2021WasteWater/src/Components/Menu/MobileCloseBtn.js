import React from 'react';

const MobileCloseBtn = ({ onClick }) => {

  return (
    <div className="mobileXbtn" onClick={onClick}>
      <span className="mobileX mobileX1"></span>
      <span className="mobileX mobileX2"></span>
    </div>
  );
};

export default MobileCloseBtn;
