import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { check } from '../../modules/user';
import './CSS/MBHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const MBHeader = () => {
  const realtimeRef = useRef(),
    dataRef = useRef(),
    apiRef = useRef(),
    noticeRef = useRef(),
    adminRef = useRef(),
    dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const handleClick = (e) => {
    const path = window.location.pathname.toString();
    const filteredPath = removeNum(path);
    switch (filteredPath) {
      case '/siheung/':
        realtimeRef.current.classList.add('active');
        break;
      case '/siheung/dataInfo/observed':
      case '/siheung/dataInfo/fog':
        dataRef.current.classList.add('active');
        break;
      case '/siheung/info/sysInfo':
      case '/siheung/info/apiInfo':
        apiRef.current.classList.add('active');
        break;
      case '/siheung/notice/list/':
      case '/siheung/notice/write':
      case '/siheung/notice/view/':
      case '/siheung/notice/edit/':
        noticeRef.current.classList.add('active');
        break;
      case '/siheung/login':
        adminRef.current.classList.add('active');
        break;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    Cookies.remove('Authorization');
    dispatch(check());
  };

  const removeNum = (string) => {
    const result = string.replace(/[0-9]/gi, '');
    return result;
  };

  return (
    <div className="mapMain">
      <nav className="navbar MBHead">
        <div className="MBmenu">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faBars} color="#434343" />
          </button>
        </div>
        <div className="MBlogo">
          <a className="navbar-brand" href="/">
            <img
              src="/img/common/mobile/MBlogo.png"
              alt="시흥시 안개위험 알리미"
            />
          </a>
        </div>
        <div className="MBsetting">
          {user ? (
            <a className="navbar-brand" href="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} color="#434343" />
            </a>
          ) : (
            <a className="navbar-brand" href="/login">
              <FontAwesomeIcon icon={faSignInAlt} color="#434343" />
            </a>
          )}
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a ref={realtimeRef} className="nav-link" href="/">
              <div className="weatherIcon Icon01"></div>실시간 데이터
            </a>
            <a ref={dataRef} className="nav-link" href="/dataInfo/observed">
              <div className="weatherIcon Icon02"></div>관측정보
            </a>
            <a ref={apiRef} className="nav-link" href="/info/sysInfo">
              <div className="weatherIcon Icon03"></div>정보제공
            </a>
            <a ref={noticeRef} className="nav-link" href="/notice/list/1">
              <div className="weatherIcon Icon04"></div>공지사항
            </a>
            <a ref={adminRef} className="nav-link" href="/login">
              <div className="weatherIcon Icon05"></div>관리자
            </a>
          </div>
          <div className="MBcopyright">
            <p>
              <a href="/privacym">개인정보 처리방침</a> <span>|</span>
              <a href="/emailm">이메일무단수집거부</a> <span>|</span>
              <a href="/copyrightm">저작권보호 및 정책</a>
            </p>
            <p className="address">
              (우 14998) 경기도 시흥시 시청로 20 (장현동) <br />
              TEL : 031-310-2114 &emsp; FAX : 031-310-2888 <br />
            </p>
            <p className="copy">
              COPYRIGHT © 2019. SIHEUNG. All RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MBHeader;
