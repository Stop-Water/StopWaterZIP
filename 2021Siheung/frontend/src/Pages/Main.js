import React from 'react';
import { Map } from '../Components';
import './CSS/Main.css';

const Main = () => {
  return (
    <>
      <div className="landscape">
        <span className="mobileRotate">
          <img src="/img/common/mobile/mobileRotate.png" alt="세로모드 변경" />
        </span>
        <p className="mb-0">
          시흥시 안개위험 알리미는
          <br />
          세로모드로 서비스중입니다.
        </p>
      </div>
      <Map />
    </>
  );
};

export default Main;
