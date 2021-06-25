import React from 'react';
import './CSS/Copyright.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RejectionEmail = ({ handleContClose }) => {
  return (
    <div>
      <div className="PopBG" onClick={handleContClose}></div>
      <div className="PopupCenter">
        <div className="PopupBox">
          <div className="tit">
            <h2>이메일무단수집거부 &ensp;</h2>
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
              본 웹 사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그
              밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며 이를
              위반 시 정보통신망법에 의해 형사 처벌됨을 유념하시기 바랍니다.
              <br />
              <br />
              <p>
                ※ 정보통신망 이용촉진 및 정보보호 등에 관한법률 제50조의 2
                (전자우편주소의 무단 수집행위 등 금지)
              </p>{' '}
            </h3>
            <h4>
              정보통신망법 제 50조의 2 (전자우편주소의 무단 수집행위 등 금지)
            </h4>
            <p>
              · 누구든지 전자우편주소의 수집을 거부하는 의사가 명시된 인터넷
              홈페이지에서 자동으로 전자우편주소를 수집하는 프로그램 그 밖의
              기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니된다.
              <br />
              · 누구든지 제1항의 규정을 위반하여 수집된 전자우편주소를
              판매·유통하여서는 아니된다.
              <br />
              · 누구든지 제1항의 및 제2항의 규정에 의하여 수집·판매 및 유통이
              금지된 전자우편주소임을 알고 이를 정보전송에 이용하여서는
              아니된다.
              <br />
              <br />※ 만일, 위와 같은 기술적 조치를 사용한 이메일주소 무단수집
              피해를 당하신 경우 불법스팸 대응센터 전용전화(국번없이 02-1336)나
              홈페이지( www.spamcop.or.kr )의 신고 창을 통하여 신고하기
              바랍니다.{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionEmail;
