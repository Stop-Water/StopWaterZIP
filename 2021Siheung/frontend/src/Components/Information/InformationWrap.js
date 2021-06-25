import React, { useState, useRef, useEffect } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import SysInfo from './SysInfo';
import ApiInfo from './ApiInfo';

const InformationWrap = () => {
  const [currentLocation, setCurrentLocation] = useState('시스템 소개');
  const sysInfoRef = useRef();
  const sysInfoSpan = useRef();
  const noiceRef = useRef();
  const noticeSapn = useRef();

  const handleClick = (e) => {
    switch (e.target.id) {
      case 'sysInfo':
        sysInfoRef.current.classList.add('over');
        sysInfoSpan.current.style.display = 'inline-block';
        noiceRef.current.classList.remove('over');
        noticeSapn.current.style.display = 'none';
        setCurrentLocation('시스템 소개');
        break;
      case 'notice':
        noiceRef.current.classList.add('over');
        noticeSapn.current.style.display = 'inline-block';
        sysInfoRef.current.classList.remove('over');
        sysInfoSpan.current.style.display = 'none';
        setCurrentLocation('API 소개');
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    const path = window.location.pathname.toString();
    const filteredPath = removeNum(path);
    switch (filteredPath) {
      case '/siheung/info/sysInfo':
        sysInfoRef.current.classList.add('over');
        sysInfoSpan.current.style.display = 'inline-block';
        noiceRef.current.classList.remove('over');
        noticeSapn.current.style.display = 'none';
        setCurrentLocation('시스템 소개');
        break;
      case '/siheung/info/apiInfo':
        noiceRef.current.classList.add('over');
        noticeSapn.current.style.display = 'inline-block';
        sysInfoRef.current.classList.remove('over');
        sysInfoSpan.current.style.display = 'none';
        setCurrentLocation('API 소개');
        break;
      default:
        sysInfoRef.current.classList.add('over');
        sysInfoSpan.current.style.display = 'inline-block';
        noiceRef.current.classList.remove('over');
        noticeSapn.current.style.display = 'none';
        setCurrentLocation('시스템 소개');
        break;
    }
  }, []);

  const removeNum = (string) => {
    const result = string.replace(/[0-9]/gi, '');
    return result;
  };

  return (
    <div className="subContWrap">
      <div className="subContBGWrap">
        <div className="subContainer IntroWidth">
          <div className="subHead">
            <div className="subTitBox">
              <h1 className="subTit">
                <img src="/img/common/leftMenu03Over.png" alt="게시판 아이콘" />
                &nbsp; 정보 제공
              </h1>
              <h4>
                <FontAwesomeIcon icon={faHome} color="#fff" /> &nbsp; HOME &#62;
                정보 제공 &#62; {currentLocation}
              </h4>

              <div className="subTab">
                <div
                  className="leftTab over"
                  ref={sysInfoRef}
                  onClick={handleClick}
                >
                  <Link to="/info/sysInfo" id="sysInfo">
                    <span ref={sysInfoSpan}></span>시스템 소개
                  </Link>
                </div>
                <div className="rightTab" ref={noiceRef} onClick={handleClick}>
                  <Link to="/info/apiInfo" id="notice">
                    <span ref={noticeSapn}></span>API 소개
                  </Link>
                </div>
                <div className="clearBoth"></div>
              </div>
            </div>
            {/*subTitBox*/}
          </div>
          <Switch>
            <Route path="/info/sysInfo" exact={true} component={SysInfo} />
            <Route path="/info/apiInfo" exact={true} component={ApiInfo} />
            <Route render={() => <Redirect to="/notFound" />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default InformationWrap;
