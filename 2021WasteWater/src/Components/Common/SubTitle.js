import React from 'react';
import './scss/SubTitle.scss';

const SubTitle = ({ title }) => {
  return (
    <div className="subTitleWrap">
      <div className="titleRow">
        <div className="subTitle">{title}</div>
        <div className="smallNav">
          <a href="#">홈</a>
          <span>〉</span>
          <a href="#">{title}</a>
          {/* 통계 페이지의 경우 홈>통계, 관리페이지의 경우 홈>관리자>측정소 정보관리 같은 형태로 3개까지 표출 */}
        </div>
      </div>
    </div>
  );
};

export default SubTitle;
