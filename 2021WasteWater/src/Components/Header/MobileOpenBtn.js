import React from 'react';

const MobileOpenBtn = ({ onClick }) => {
  return (
    <div className="mobileMenuBtn" onClick={onClick}>
      <span className="ham ham1"></span>
      <span className="ham ham2"></span>
      <span className="ham ham3"></span>
    </div>
  );
};

export default MobileOpenBtn;
