import React from 'react';
import './CSS/Copyright.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PrivacyPolicy = ({ handleContClose }) => {
  return (
    <div>
      <div className="PopBG" onClick={handleContClose}></div>
      <div className="PopupCenter">
        <div className="PopupBox">
          <div className="tit">
            <h2>홈페이지 저작권 보호정책 &ensp;</h2>
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
              시흥시 스마트 안개 관제 시스템은 저작권법 등 관련법령상의 규정을
              준수하며, 홈페이지 저작권 보호정책은 아래와 같습니다. 이 저작권
              보호정책은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의
              추가, 삭제 및 정정이 있는 경우에는 홈페이지 공지사항을 통하여
              공지할 것입니다.
            </h3>
            <br />
            <p>
              · 시흥시 스마트 안개 관제 시스템은 크롬, 파이어폭스, 엣지에서
              최적화 되어있으며 화면해상도 1920x1080이상을 권장하며, 그 이상의
              해상도에서 보시면 더 많은 내용을 화면 스크롤 없이 보실 수
              있습니다.
              <br />
              · 시흥시 스마트 안개 관제 시스템에서 제공하는 모든 자료 즉 웹문서,
              첨부파일, 데이터베이스(DB)자료 등은 저작권법에 의하여 보호받는
              저작물로 무단 복제 및 배포를 원칙적으로 금합니다. 저작물을 이용 및
              변경하고자 할 때는 반드시 담당자와 사전에 협의한 이후에 이용하여
              주시기 바랍니다.
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
