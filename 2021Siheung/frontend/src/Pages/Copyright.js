import React from 'react';
import './CSS/Copyright.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Copyright = ({ handleContClose }) => {
  return (
    <div>
      <div className="PopBG" onClick={handleContClose}></div>
      <div className="PopupCenter">
        <div className="PopupBox">
          <div className="tit">
            <h2>개인정보 처리방침 &ensp;</h2>
            <span>
              <FontAwesomeIcon
                icon={faTimes}
                color="#333"
                onClick={handleContClose}
              />
            </span>
          </div>
          <div className="text">
            <h3>
              시흥시 스마트 안개 관제 시스템이 취급하는 모든 개인정보는 개인정보
              보호법 등 관련 법령상의 개인정보보호 규정을 준수하여
              수집·보유·처리 되고 있습니다.{' '}
            </h3>
            <br />
            <p>
              · 시흥시 스마트 안개 관제 시스템은 개인정보보호법에 따라 이용자의
              개인정보 보호 및 권익을 보호하고 개인정보화 관련한 이용자의 고충을
              원활하게 처리할 수 있도록 다음과 같은 처리 방침을 두고 있습니다.
              <br />
              · 특히, 개인정보를 처리하는 시흥시 스마트 안개 관제 시스템
              홈페이지의 경우 『개인정보 보호법』제30조 제1항 및 동법『시행령』
              제31조 제1항의 규정에 의하여 해당 홈페이지에
              별도의『개인정보처리방침』을 정하여 운영하고 있습니다.
              <br />· 시흥시 스마트 안개 관제 시스템은 개인정보처리방침을
              변경하는 경우에는 시행의 시기, 변경된 내용을 정보주체가 쉽게 확인
              할 수 있도록 공지사항 게시판에 변경 전·후를 비교하여 공개하도록 할
              예정입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
