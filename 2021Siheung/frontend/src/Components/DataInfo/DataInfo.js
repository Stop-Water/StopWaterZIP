import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import ObservedData from './ObservedData';
import FogData from './FogData';

const DataInfo = ({ data, history }) => {
  const observedRef = useRef();
  const observedSpan = useRef();
  const fogRef = useRef();
  const fogSpan = useRef();
  const [currentLocation, setCurrentLocation] = useState('과거 관측정보 조회');
  const overrideStrings = {
    selectSomeItems: '관측소를 선택하세요.',
    selectAll: '모두 선택',
    allItemsAreSelected: '모든 지점이 선택되었습니다.',
  };

  const handleClick = (e) => {
    switch (e.target.id) {
      case 'observed':
        observedRef.current.classList.add('over');
        observedSpan.current.style.display = 'inline-block';
        fogRef.current.classList.remove('over');
        fogSpan.current.style.display = 'none';
        setCurrentLocation('과거 관측정보 조회');
        break;
      case 'fog':
        fogRef.current.classList.add('over');
        fogSpan.current.style.display = 'inline-block';
        observedRef.current.classList.remove('over');
        observedSpan.current.style.display = 'none';
        setCurrentLocation('지점별 안개탐지 통계');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();
    if (
      (navigator.appName === 'Netscape' &&
        navigator.userAgent.search('Trident') !== -1) ||
      agent.indexOf('msie') !== -1
    ) {
      alert(
        '관측정보 기능은 익스플로러 브라우저에서 지원하지 않습니다. 타 브라우저로 접속바랍니다.',
      );
      history.push('/');
      history.go(0);
    }

    switch (window.location.pathname) {
      case '/siheung/dataInfo/observed':
        observedRef.current.classList.add('over');
        observedSpan.current.style.display = 'inline-block';
        fogRef.current.classList.remove('over');
        fogSpan.current.style.display = 'none';
        setCurrentLocation('과거 관측정보 조회');
        break;
      case '/siheung/dataInfo/fog':
        fogRef.current.classList.add('over');
        fogSpan.current.style.display = 'inline-block';
        observedRef.current.classList.remove('over');
        observedSpan.current.style.display = 'none';
        setCurrentLocation('지점별 안개탐지 통계');
        break;
      default:
        break;
    }
  }, [history]);

  return (
    <div className="subContBGWrap">
      <div className="subContainer">
        <div className="subHead">
          <div className="subTitBox">
            <h1 className="subTit">
              <img src="/img/common/leftMenu02Over.png" alt="관측정보 아이콘" />
              &nbsp; 관측정보
            </h1>
            <h4>
              <FontAwesomeIcon icon={faHome} color="#fff" /> &nbsp; HOME &#62;
              관측정보 &#62; {currentLocation}
            </h4>

            <div className="subTab">
              <div
                className="leftTab over"
                ref={observedRef}
                onClick={handleClick}
              >
                <Link to="/dataInfo/observed" id="observed">
                  <span ref={observedSpan}></span>과거 관측정보 조회
                </Link>
              </div>
              <div className="rightTab" ref={fogRef} onClick={handleClick}>
                <Link to="/dataInfo/fog" id="fog">
                  <span ref={fogSpan}></span>지점별 안개탐지 통계
                </Link>
              </div>
              <div className="clearBoth"></div>
            </div>
          </div>
          {/*subTitBox*/}
        </div>
        <Switch>
          <Route
            path="/dataInfo/observed"
            exact={true}
            render={() => (
              <ObservedData options={data} overrideStrings={overrideStrings} />
            )}
          />
          <Route
            path="/dataInfo/fog"
            exact={true}
            render={() => (
              <FogData options={data} overrideStrings={overrideStrings} />
            )}
          />
          {/*subHead*/}
          <Route render={() => <Redirect to="/notFound" />} />
        </Switch>
        {/*subConainerWrap*/}
      </div>
    </div>
  );
};

export default withRouter(DataInfo);
