import React, { useRef, useEffect, useState } from 'react';
import Copyright from '../../Pages/Copyright';
import Email from '../../Pages/RejectionEmail';
import Privacy from '../../Pages/PrivacyPolicy';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';
import { check } from '../../modules/user';
import CopyrightWrap from './CopyrightWrap';
import './CSS/Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Header = ({ history }) => {
  const [popup, setPopup] = useState();
  const dispatch = useDispatch();
  const realtimeRef = useRef(),
    dataRef = useRef(),
    apiRef = useRef(),
    noticeRef = useRef(),
    adminRef = useRef();

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  useEffect(() => {
    const path = window.location.pathname.toString();
    const filteredPath = removeNum(path);
    switch (filteredPath) {
      case '/siheung/':
        realtimeRef.current.classList.add('over');
        break;
      case '/siheung/dataInfo/observed':
      case '/siheung/dataInfo/fog':
        dataRef.current.classList.add('over');
        break;
      case '/siheung/info/sysInfo':
      case '/siheung/info/apiInfo':
        apiRef.current.classList.add('over');
        break;
      case '/siheung/notice/list/':
      case '/siheung/notice/write':
      case '/siheung/notice/view/':
      case '/siheung/notice/edit/':
        noticeRef.current.classList.add('over');
        break;
      case '/siheung/login':
      case '/siheung/admin':
        adminRef.current.classList.add('over');
        break;
      default:
        realtimeRef.current.classList.add('over');
    }
  }, []);

  const removeNum = (string) => {
    const result = string.replace(/[0-9]/gi, '');
    return result;
  };

  const showCopyright = () => {
    const copyright = document.querySelector('.copyBox');
    copyright.style.display = 'block';
  };

  const closeCopyrihgt = () => {
    const copyright = document.querySelector('.copyBox');
    copyright.style.display = 'none';
  };

  const switchColor = (add, remove1, remove2, remove3, remove4) => {
    add.current.classList.add('over');
    remove1.current.classList.remove('over');
    remove2.current.classList.remove('over');
    remove3.current.classList.remove('over');
    remove4.current.classList.remove('over');
  };

  const handleClick = (e) => {
    closeCopyrihgt();
    switch (e.target.id) {
      case 'realtime':
      case 'realtimeIcon':
      case 'realtimeText':
        switchColor(realtimeRef, dataRef, apiRef, noticeRef, adminRef);
        break;
      case 'data':
      case 'dataIcon':
      case 'dataText':
        switchColor(dataRef, realtimeRef, apiRef, noticeRef, adminRef);
        break;
      case 'api':
      case 'apiIcon':
      case 'apiText':
        switchColor(apiRef, realtimeRef, dataRef, noticeRef, adminRef);
        break;
      case 'notice':
      case 'noticeIcon':
      case 'noticeText':
        switchColor(noticeRef, realtimeRef, dataRef, apiRef, adminRef);
        break;
      case 'admin':
      case 'adminIcon':
      case 'adminText':
        switchColor(adminRef, realtimeRef, dataRef, apiRef, noticeRef);
        break;
      default:
        return null;
    }
  };

  const handleGoHome = (e) => {
    e.preventDefault();
    const path = window.location.pathname.toString();
    if (path !== '/siheung/') {
      switchColor(realtimeRef, dataRef, apiRef, noticeRef, adminRef);
      history.push('/');
    } else {
      window.location.replace('/siheung/');
    }
  };

  const handleLogout = () => {
    Cookies.remove('Authorization');
    dispatch(check());
    switchColor(realtimeRef, dataRef, apiRef, noticeRef, adminRef);
  };

  const handleContClick = (e) => {
    e.preventDefault();
    setPopup(e.target.id);
  };

  const handleContClose = () => {
    setPopup();
  };

  return (
    <>
      {popup === 'copyright' ? (
        <Copyright handleContClose={handleContClose} />
      ) : (
        <></>
      )}
      {popup === 'email' ? <Email handleContClose={handleContClose} /> : <></>}
      {popup === 'privacy' ? (
        <Privacy handleContClose={handleContClose} />
      ) : (
        <></>
      )}

      <div className="leftMenu">
        <div className="innerRelative">
          <div className="logo">
            <Link to="#" onClick={handleGoHome}>
              <img src="/img/common/logo.png" alt="시흥시 안개위험 알리미" />
            </Link>
          </div>
          <ul className="leftMenuNav">
            <Link to="/" id="realtime" ref={realtimeRef} onClick={handleGoHome}>
              <div id="realtimeIcon" className="leftMenu01"></div>
              <p id="realtimeText">실시간 데이터</p>
            </Link>
            <Link
              to="/dataInfo/observed"
              id="data"
              ref={dataRef}
              onClick={handleClick}
            >
              <div id="dataIcon" className="leftMenu02"></div>
              <p id="dataText">관측정보</p>
            </Link>
            <Link
              to="/info/sysInfo"
              id="api"
              ref={apiRef}
              onClick={handleClick}
            >
              <div id="apiIcon" className="leftMenu03"></div>
              <p id="apiText">정보제공</p>
            </Link>
            <Link
              to="/notice/list/1"
              id="notice"
              ref={noticeRef}
              onClick={handleClick}
            >
              <div id="noticeIcon" className="leftMenu04"></div>
              <p id="noticeText">공지사항</p>
            </Link>
            <Link to="/login" id="admin" ref={adminRef} onClick={handleClick}>
              <div id="adminIcon" className="leftMenu05"></div>
              <p id="adminText">관리자</p>
            </Link>
            {user ? (
              <>
                <Link to="/" className="leftLogoutBtn" onClick={handleLogout}>
                  <p>로그아웃</p>
                </Link>
                <div>{user}</div>
              </>
            ) : (
              <></>
            )}
          </ul>
          <div className="copyright" onClick={showCopyright}>
            <p>copyright </p>
            <span className="arrow">
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
          </div>
          <CopyrightWrap
            close={closeCopyrihgt}
            handleContClick={handleContClick}
            popup={popup}
            setPopup={setPopup}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(Header);
