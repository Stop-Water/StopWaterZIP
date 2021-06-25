import React from 'react';
import './CSS/Legend.css';

const Legend = ({ layer }) => {
  return (
    <div>
      {layer === 'temp' ? (
        <div className="legendWrap">
          <img src={'/img/map/Legend01.png'} alt="온도 범례" />
        </div>
      ) : layer === 'humid' ? (
        <div className="legendWrap">
          <img src={'/img/map/Legend03.png'} alt="습도 범례" />
        </div>
      ) : layer === 'dust' ? (
        <div className="legendWrap">
          <img src={'/img/map/Legend02.png'} alt="초미세먼지 범례" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Legend;
