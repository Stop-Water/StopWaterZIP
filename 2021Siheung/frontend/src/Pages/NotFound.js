import React from 'react';
import './CSS/NotFound.css';

const NotFound = ({ history }) => {
  return (
    <div>
      <div className="NotFoundBG">
        <div className="NotFoundBGinner row">
          <div className="NotFoundLeft">
            <h2>
              404 <br /> Error Page
            </h2>
            <h3>요청하신 페이지를 찾을 수 없습니다.</h3>
            <p>
              방문하시려는 페이지의 주소가 잘못 입력되었거나,
              <br />
              페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
              없습니다.
              <br />
              입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
            </p>
            <button
              className="GoMainBtn"
              onClick={() => {
                history.push('/');
                history.go(0);
              }}
            >
              메인으로 바로가기
            </button>
          </div>
          <div className="NotFoundRight">
            <img src="/img/common/NotFoundIMG.png" alt="404 이미지" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
