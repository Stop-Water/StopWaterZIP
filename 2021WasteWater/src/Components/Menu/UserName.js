import React from 'react';
import { useSelector } from 'react-redux';

const UserName = () => {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="userNameWrap">
      <div className="userIcon">
        <svg viewBox="0 0 37 37">
          <g transform="translate(-1783 -1680)">
            <path
              d="M6,30.691v-.265a6.862,6.862,0,0,1,6.86-6.86h.852a8.889,8.889,0,0,0,7.442,0h.852a6.862,6.862,0,0,1,6.861,6.86v.379A17.5,17.5,0,0,1,6,30.691ZM10.9,15.4a6.534,6.534,0,1,1,6.534,6.533A6.534,6.534,0,0,1,10.9,15.4Z"
              transform="translate(1784 1681)"
            />
            <circle
              cx="17.5"
              cy="17.5"
              r="17.5"
              transform="translate(1784 1681)"
              fill="none"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
      {/* '관측자' 부분에 아이디가 들어갑니다. */}
      <div className="userName">{userName}님</div>
      <div className="userText">{userName}님, 환영합니다.</div>
    </div>
  );
};

export default UserName;
