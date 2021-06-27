import React from 'react';

import './scss/NoticeCard.scss';

const NoticeCard = ({ noti }) => {
  return (
    <div className="noticeCard">
      <div className="noticeIcon">
        {/* 아이콘 변경 */}
        {noti.notiFlag === 1 && (
          <svg className="errorIcon" viewBox="0 0 34.317 30.504">
            <path
              id="exclamation-triangle-solid"
              d="M33.93,26.215A2.861,2.861,0,0,1,31.453,30.5H2.863A2.861,2.861,0,0,1,.386,26.215l14.3-24.786a2.861,2.861,0,0,1,4.954,0l14.3,24.786ZM17.158,21.091A2.741,2.741,0,1,0,19.9,23.832,2.741,2.741,0,0,0,17.158,21.091Zm-2.6-9.851.442,8.1a.715.715,0,0,0,.714.676H18.6a.715.715,0,0,0,.714-.676l.442-8.1a.715.715,0,0,0-.714-.754H15.27a.715.715,0,0,0-.714.754Z"
              transform="translate(0)"
            />
          </svg>
        )}
        {noti.notiFlag === 2 && (
          <svg
            className="errorIcon"
            width="33.671"
            height="33.671"
            viewBox="0 0 33.671 33.671"
          >
            <path
              id="times-circle-solid_1_"
              data-name="times-circle-solid (1)"
              d="M24.835,8A16.836,16.836,0,1,0,41.67,24.836,16.832,16.832,0,0,0,24.835,8ZM33.09,29.255a.815.815,0,0,1,0,1.154L30.4,33.09a.815.815,0,0,1-1.154,0l-4.412-4.453L20.416,33.09a.815.815,0,0,1-1.154,0L16.581,30.4a.815.815,0,0,1,0-1.154l4.453-4.413-4.453-4.419a.815.815,0,0,1,0-1.154l2.688-2.688a.815.815,0,0,1,1.154,0l4.412,4.46,4.419-4.453a.815.815,0,0,1,1.154,0L33.1,19.269a.815.815,0,0,1,0,1.154l-4.46,4.413Z"
              transform="translate(-8 -8)"
            />
          </svg>
        )}
        {noti.notiFlag === 3 && (
          <svg
            className="errorIcon"
            width="33.336"
            height="33.336"
            viewBox="0 0 33.336 33.336"
          >
            <path
              id="ban-solid"
              d="M24.668,8A16.668,16.668,0,1,0,41.336,24.668,16.668,16.668,0,0,0,24.668,8Zm8.744,7.923A12.368,12.368,0,0,1,34.8,31.76L17.575,14.534A12.368,12.368,0,0,1,33.412,15.923ZM15.923,33.412a12.368,12.368,0,0,1-1.39-15.837L31.76,34.8A12.368,12.368,0,0,1,15.923,33.412Z"
              transform="translate(-8 -8)"
            />
          </svg>
        )}
      </div>
      <div className="noticeContents">
        <div className="nTop">
          <div className="nPlace">{noti.stationName}</div>
          <div className="nTime">{noti.time}</div>
        </div>
        <div className="nBottom">
          <div className="nClass">{noti.sensorFlag}</div>
          <div className="errorMassage">{noti.errorFlag}</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
