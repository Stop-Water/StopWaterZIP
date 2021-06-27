import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalKind, updateModalOpen } from '../../modules/common';
import FooterBtn from '../Menu/FooterBtn';
import './scss/Footer.scss';

const Footer = () => {
  const dispatch = useDispatch();
  const isFooterOpen = useSelector((state) => state.menu.isFooterOpen);

  const handleClick = (e) => {
    const modalMenu = e.target.id;
    dispatch(updateModalOpen(true));
    dispatch(updateModalKind(modalMenu));
  };

  return (
    <div className={isFooterOpen ? 'footerWrap on' : 'footerWrap'}>
      <FooterBtn />
      <div className="footerText">
        <div className="footerLogo">
          <svg
            className="smallLogo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33.891 35"
          >
            <path
              d="M732.852,329.67a6.971,6.971,0,0,1-6.951-6.484H723.61a9.273,9.273,0,0,0,18.518,0h-2.292A7,7,0,0,1,732.852,329.67Z"
              transform="translate(-715.925 -304.657)"
              fill="#48affb"
            />
            <path
              d="M732.91,333.753a11.069,11.069,0,0,1-11.038-10.567h-2.28A13.351,13.351,0,0,0,732.9,336.033h.014a13.352,13.352,0,0,0,13.31-12.847h-2.281A11.067,11.067,0,0,1,732.91,333.753Z"
              transform="translate(-715.964 -304.657)"
              fill="#48affb"
            />
            <path
              d="M732.943,337.377a14.733,14.733,0,0,1-14.665-14.191H716a17.014,17.014,0,0,0,16.908,16.471h.076a17.013,17.013,0,0,0,16.907-16.471h-2.28A14.733,14.733,0,0,1,732.943,337.377Z"
              transform="translate(-715.998 -304.657)"
              fill="#48affb"
            />
            <path
              d="M747.384,320.442h2.286a17.022,17.022,0,0,0-15.129-15.609v2.3A14.739,14.739,0,0,1,747.384,320.442Z"
              transform="translate(-715.82 -304.833)"
              fill="#48affb"
            />
            <path
              d="M730.758,307.175v-2.3a16.988,16.988,0,0,0-14.72,15.565h2.287A14.711,14.711,0,0,1,730.758,307.175Z"
              transform="translate(-715.997 -304.833)"
              fill="#48affb"
            />
            <path
              d="M732.919,311.438a.236.236,0,0,0-.325.076c-.974,1.551-5.176,8.395-5.176,11.121,0,.123,0,.245,0,.368a5.38,5.38,0,0,0,10.754-.368c0-2.73-4.2-9.569-5.177-11.121A.236.236,0,0,0,732.919,311.438Z"
              transform="translate(-715.888 -304.77)"
              fill="#ffca23"
            />
          </svg>
          <div className="footerTitle">
            Iot 기반 하수관망용 다중센서 허브 시스템
          </div>
        </div>
        <div className="infoPage">
          <a href="#" id="privacy" onClick={handleClick}>
            개인정보처리방침
          </a>
          <span>|</span>
          <a href="#" id="noEmail" onClick={handleClick}>
            이메일무단수집거부
          </a>
          <span>|</span>
          <a href="#" id="copyright" onClick={handleClick}>
            저작권보호및정책
          </a>
          <span>|</span>
          <a href="#" id="terms" onClick={handleClick}>
            이용약관
          </a>
        </div>
        <div className="copyright">
          <span>인천광역시 부평구 부평대로 283, B동 904호</span>
          <span>
            © 2020 IoT기반 하수관망용 다중센서 허브 시스템. ALL RIGHT RESERVED.
            DESIGNED BY ECOFLAG
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
