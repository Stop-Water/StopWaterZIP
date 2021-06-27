import React from 'react';
import Error from '../Components/Error/Error';

const ERROR_CONTENT = {
  page404: {
    icon: (
      <svg viewBox="0 0 184 172.275">
        <g transform="translate(-25 -15)">
          <g transform="translate(25 15)">
            <rect
              width="184"
              height="137"
              transform="translate(0 29)"
              fill="#dfe3e6"
            />
            <rect
              width="160"
              height="115"
              transform="translate(12 40)"
              fill="#fff"
            />
            <path
              d="M208.76,43.712H25V20.742A5.745,5.745,0,0,1,30.742,15H203.017a5.745,5.745,0,0,1,5.742,5.742Z"
              transform="translate(-25 -15)"
              fill="#5e5c5c"
            />
            <path
              d="M208.76,73H25a6.558,6.558,0,0,0,1.683,4.436,5.483,5.483,0,0,0,4.06,1.839H203.017a5.483,5.483,0,0,0,4.06-1.839A6.558,6.558,0,0,0,208.76,73Z"
              transform="translate(-25 93)"
              fill="#cfd3d6"
            />
            <g transform="translate(11.609 14.318)">
              <line
                x2="6"
                transform="translate(11.391 -0.318)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <line
                x2="6"
                transform="translate(22.391 -0.318)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <line
                x2="6"
                transform="translate(0.391 -0.318)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="6"
              />
            </g>
          </g>
          <g transform="translate(62.149 95.395)">
            <path
              d="M71.227,71.712a5.745,5.745,0,0,1-5.742,5.743H59.743A5.745,5.745,0,0,1,54,71.712V48.742A5.745,5.745,0,0,1,59.743,43h5.743a5.745,5.745,0,0,1,5.742,5.742Z"
              transform="translate(-7.883 -43)"
              fill="none"
              stroke="#5e5c5c"
              stroke-miterlimit="10"
              stroke-width="6"
            />
            <path
              d="M65.97,68.841H43V63.1L57.356,43h2.871V80.326"
              transform="translate(-28.466 -43)"
              fill="none"
              stroke="#5e5c5c"
              stroke-miterlimit="10"
              stroke-width="6"
            />
            <path
              d="M86.97,68.841H64V63.1L78.356,43h2.871V80.326"
              transform="translate(10.83 -43)"
              fill="none"
              stroke="#5e5c5c"
              stroke-miterlimit="10"
              stroke-width="6"
            />
            <g transform="translate(0 26.021)">
              <line
                x2="6"
                transform="translate(-0.149 -0.416)"
                fill="none"
                stroke="#5e5c5c"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <line
                x2="5"
                transform="translate(103.851 -0.416)"
                fill="none"
                stroke="#5e5c5c"
                stroke-miterlimit="10"
                stroke-width="6"
              />
            </g>
          </g>
          <rect
            width="138"
            height="17"
            transform="translate(48 67)"
            fill="#f4608a"
          />
          <rect
            width="138"
            height="18"
            transform="translate(48 141)"
            fill="#f4608a"
          />
        </g>
      </svg>
    ),
    title: '요청하신 페이지를 찾을 수 없습니다.',
    content: (
      <span>
        페이지의 주소가 잘못 입력되었거나,<br></br>
        페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        <br></br>
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </span>
    ),
  },
  common: {
    icon: (
      <svg viewBox="0 0 184 172.21">
        <g transform="translate(-25 -15)">
          <g transform="translate(25 15)">
            <rect
              width="184"
              height="138"
              transform="translate(0 29)"
              fill="#dfe3e6"
            />
            <rect
              width="161"
              height="115"
              transform="translate(11 40)"
              fill="#fff"
            />
            <path
              d="M208.691,43.7H25V20.74A5.742,5.742,0,0,1,30.74,15h172.21a5.742,5.742,0,0,1,5.74,5.74Z"
              transform="translate(-25 -15)"
              fill="#5e5c5c"
            />
            <path
              d="M208.691,73H25a5.742,5.742,0,0,0,5.74,5.74h172.21a5.742,5.742,0,0,0,5.74-5.74Z"
              transform="translate(-25 93.47)"
              fill="#cfd3d6"
            />
            <g transform="translate(11.06 14.077)">
              <line
                x2="6"
                transform="translate(-0.06 -0.077)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <line
                x2="6"
                transform="translate(11.94 -0.077)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <line
                x2="6"
                transform="translate(22.94 -0.077)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="6"
              />
            </g>
          </g>
          <g transform="translate(39.351 58.053)">
            <g>
              <path
                d="M30,41.481V30H41.481"
                transform="translate(-30 -30)"
                fill="none"
                stroke="#5e5c5c"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <path
                d="M91.481,41.481V30H80"
                transform="translate(63.509 -30)"
                fill="none"
                stroke="#5e5c5c"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <path
                d="M30,64V75.481H41.481"
                transform="translate(-30 33.586)"
                fill="none"
                stroke="#5e5c5c"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <path
                d="M91.481,64V75.481H80"
                transform="translate(63.509 33.586)"
                fill="none"
                stroke="#5e5c5c"
                stroke-miterlimit="10"
                stroke-width="6"
              />
            </g>
            <g transform="translate(28.702 14.431)">
              <path
                d="M40,118.183l46.3-81.7a2.87,2.87,0,0,1,4.994,0l46.3,81.7Z"
                transform="translate(-40 -35.028)"
                fill="#f4608a"
              />
              <path
                d="M47,93.663,75.7,42l28.7,51.663Z"
                transform="translate(-26.909 -21.989)"
                fill="#ffdc73"
              />
              <g transform="translate(48.445 37.03)">
                <line
                  y2="17"
                  transform="translate(-0.498 0.486)"
                  fill="none"
                  stroke="#474545"
                  stroke-linejoin="round"
                  stroke-width="6"
                />
                <line
                  y2="6"
                  transform="translate(-0.498 23.486)"
                  fill="none"
                  stroke="#474545"
                  stroke-linejoin="round"
                  stroke-width="6"
                />
              </g>
              <path
                d="M40,64a2.871,2.871,0,0,0,2.87,2.87h91.846a2.871,2.871,0,0,0,2.87-2.87Z"
                transform="translate(-40 19.155)"
                fill="#d9416b"
              />
            </g>
            <g transform="translate(22.851 54.477)">
              <line
                x1="6"
                transform="translate(103.798 0.47)"
                fill="none"
                stroke="#474545"
                stroke-miterlimit="10"
                stroke-width="6"
              />
              <line
                x1="6"
                transform="translate(-0.202 0.47)"
                fill="none"
                stroke="#474545"
                stroke-miterlimit="10"
                stroke-width="6"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
    title: '요청하신 페이지에 문제가 있습니다',
    content: (
      <span>
        지금 이 서비스에 연결할 수 없습니다.<br></br>
        문제를 해결하기 위해 노력하고 있습니다.<br></br>
        이용에 불편을 드려 죄송합니다. 잠시 후 다시 확인해주세요.
      </span>
    ),
  },
};

const ErrorPage = ({ flag }) => {
  const err = flag === '404' ? ERROR_CONTENT.page404 : ERROR_CONTENT.common;
  return (
    <div className="errorPage">
      <Error icon={err.icon} title={err.title} content={err.content} />
    </div>
  );
};

export default ErrorPage;
