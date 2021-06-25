import React from 'react';
import './CSS/Copyright.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CopyrightWrap = ({ close, handleContClick }) => {
  return (
    <>
      <div className="copyBox">
        <p>
          <a href="/#" id="copyright" onClick={handleContClick}>
            개인정보 처리방침
          </a>{' '}
          <span>|</span>
          <a href="/#" id="email" onClick={handleContClick}>
            이메일무단수집거부
          </a>{' '}
          <span>|</span>
          <a href="/#" id="privacy" onClick={handleContClick}>
            저작권보호 및 정책
          </a>
          <span className="close">
            <FontAwesomeIcon icon={faTimes} color="#000" onClick={close} />
          </span>
        </p>
        <p className="address">
          (우 14998) 경기도 시흥시 시청로 20 (장현동) <br />
          TEL : 031-310-2114 &emsp; FAX : 031-310-2888 <br />
        </p>
        <p className="copy">COPYRIGHT © 2019. SIHEUNG. All RIGHTS RESERVED.</p>
      </div>
    </>
  );
};

export default CopyrightWrap;
