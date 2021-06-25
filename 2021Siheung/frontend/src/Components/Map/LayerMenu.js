import React from 'react';
import './CSS/LayerMenu.css';

const LayerMenu = ({ clicked, handleClick }) => {
  return (
    <div className="weatherNav">
      <ul>
        <li>
          <div
            className={`weatherNav01 ${clicked === 'fog' ? 'over' : ''}`}
            id="fog"
            onClick={handleClick}
          ></div>
          <span id="fogSpan" onClick={handleClick}>
            안개
          </span>
        </li>
        <li>
          <div
            className={`weatherNav02 ${clicked === 'temp' ? 'over' : ''}`}
            id="temp"
            onClick={handleClick}
          ></div>
          <span id="tempSpan" onClick={handleClick}>
            기온
          </span>
        </li>
        <li>
          <div
            className={`weatherNav03 ${clicked === 'dust' ? 'over' : ''}`}
            id="dust"
            onClick={handleClick}
          ></div>
          <span id="dustSpan" onClick={handleClick} className="dustMenuText">
            초미세먼지
            {/* <br />
            (PM<span className="num">2.5</span>) */}
          </span>
        </li>
        <li>
          <div
            className={`weatherNav04 ${clicked === 'humid' ? 'over' : ''}`}
            id="humid"
            onClick={handleClick}
          ></div>
          <span id="humidSpan" onClick={handleClick}>
            습도
          </span>
        </li>
        {/*<li>
          <div
            className={`weatherNav05 ${clicked === 'rain' ? 'over' : ''}`}
            id="rain"
            onClick={handleClick}
          ></div>
          <span id="rainSpan" onClick={handleClick}>
            강수유무
          </span>
        </li>
        <li>
          <div
            className={`weatherNav06 ${clicked === 'cctv' ? 'over' : ''}`}
            id="cctv"
            onClick={handleClick}
          ></div>
          <span id="cctvSpan" onClick={handleClick}>
            CCTV
          </span>
        </li>*/}
      </ul>
    </div>
  );
};

export default LayerMenu;
