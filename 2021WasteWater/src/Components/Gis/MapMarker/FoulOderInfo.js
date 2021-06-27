import React from 'react';
import InfoItem from './InfoItem';

const FOULODER_ICON = {
  lv1: (
    <svg className="markerIcon" viewBox="0 0 42.623 42.623">
      <g transform="translate(-5080 6568)">
        <path
          d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z"
          transform="translate(5085 -6563)"
          fill="#fff"
        />
        <path
          d="M21.312,8A21.312,21.312,0,1,0,42.623,29.312,21.308,21.308,0,0,0,21.312,8Zm2.062,17.135C23.658,21.517,26.141,19,28.186,19S32.715,21.517,33,25.135a.685.685,0,0,1-1.28.387L30.9,24.061c-.662-1.177-1.659-2.239-2.715-2.239s-2.037,1.062-2.7,2.239l-.816,1.461A.7.7,0,0,1,23.374,25.135Zm-13.749,0C9.908,21.517,12.392,19,14.437,19s4.529,2.518,4.812,6.136a.685.685,0,0,1-1.28.387l-.816-1.461c-.662-1.177-1.659-2.239-2.715-2.239s-2.037,1.062-2.7,2.239l-.816,1.461A.7.7,0,0,1,9.625,25.135Zm24.654,8.473A12.385,12.385,0,0,1,22,44.436H20.624A12.385,12.385,0,0,1,8.344,33.608,1.38,1.38,0,0,1,9.71,32.061h23.2A1.376,1.376,0,0,1,34.279,33.608Z"
          transform="translate(5080 -6576)"
          fill="#42b1fa"
        />
      </g>
    </svg>
  ),
  lv2: (
    <svg className="markerIcon" viewBox="0 0 42.623 42.623">
      <g transform="translate(-4947.116 6259.04)">
        <g transform="translate(-132.884 258.96)">
          <path
            d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z"
            transform="translate(5085 -6513)"
            fill="#fff"
          />
          <path
            id="meh-solid"
            d="M21.312,8A21.312,21.312,0,1,0,42.623,29.312,21.308,21.308,0,0,0,21.312,8ZM14.437,22.437a2.75,2.75,0,1,1-2.75,2.75A2.747,2.747,0,0,1,14.437,22.437Zm14.124,16.5h-14.5a1.375,1.375,0,0,1,0-2.75h14.5A1.375,1.375,0,0,1,28.561,38.936Zm-.375-11a2.75,2.75,0,1,1,2.75-2.75A2.747,2.747,0,0,1,28.186,27.937Z"
            transform="translate(5080 -6526)"
            fill="#7bdfa6"
          />
        </g>
        <rect
          width="21"
          height="7"
          transform="translate(4958.116 -6233.04)"
          fill="#7bdfa6"
        />
        <path
          d="M2616.877,1093.052a1.163,1.163,0,0,0-1.585.437,9.409,9.409,0,0,1-16.348,0,1.163,1.163,0,1,0-2.022,1.148,11.822,11.822,0,0,0,4.5,4.452,11.335,11.335,0,0,0,11.389,0,11.814,11.814,0,0,0,4.5-4.452A1.163,1.163,0,0,0,2616.877,1093.052Z"
          transform="translate(2361.346 -7326.663)"
          fill="#fff"
        />
      </g>
    </svg>
  ),
  lv3: (
    <svg className="markerIcon" viewBox="0 0 42.623 42.623">
      <g transform="translate(-5080 6518)">
        <path
          d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z"
          transform="translate(5085 -6513)"
          fill="#fff"
        />
        <path
          d="M21.312,8A21.312,21.312,0,1,0,42.623,29.312,21.308,21.308,0,0,0,21.312,8ZM14.437,22.437a2.75,2.75,0,1,1-2.75,2.75A2.747,2.747,0,0,1,14.437,22.437Zm14.124,16.5h-14.5a1.375,1.375,0,0,1,0-2.75h14.5A1.375,1.375,0,0,1,28.561,38.936Zm-.375-11a2.75,2.75,0,1,1,2.75-2.75A2.747,2.747,0,0,1,28.186,27.937Z"
          transform="translate(5080 -6526)"
          fill="#ffcc27"
        />
      </g>
    </svg>
  ),
  lv4: (
    <svg className="markerIcon" viewBox="0 0 44.039 44.04">
      <g transform="translate(-5078.583 6468)">
        <path
          d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z"
          transform="translate(5084.583 -6462)"
          fill="#fff"
        />
        <path
          d="M22.02,8a22.02,22.02,0,1,0,22.02,22.02A22.016,22.016,0,0,0,22.02,8ZM12.075,28.6a2.812,2.812,0,0,1,.932-2.078L10.255,25.7a1.419,1.419,0,0,1,.817-2.717l7.1,2.131a1.42,1.42,0,0,1-.408,2.779c-.044,0-.1-.018-.151-.018a2.871,2.871,0,0,1,.151.728,2.846,2.846,0,0,1-5.691,0ZM26.992,42.291a6.68,6.68,0,0,0-9.953,0,1.422,1.422,0,0,1-2.184-1.82,9.308,9.308,0,0,1,14.313,0A1.418,1.418,0,0,1,26.992,42.291Zm6.8-16.595-2.752.826A2.833,2.833,0,1,1,26.29,28.6a2.472,2.472,0,0,1,.151-.728.875.875,0,0,1-.151.018,1.42,1.42,0,0,1-.408-2.779l7.1-2.131a1.417,1.417,0,1,1,.808,2.717Z"
          transform="translate(5078.583 -6476)"
          fill="#fe626f"
        />
      </g>
    </svg>
  ),
};
const FoulOderInfo = ({ data }) => {
  const FOULODER_ITEM = [
    {
      icon:
        data.nh3 <= 10
          ? FOULODER_ICON.lv1
          : data.nh3 > 11 && data.nh3 <= 20
          ? FOULODER_ICON.lv2
          : data.nh3 > 21 && data.nh3 < 31
          ? FOULODER_ICON.lv3
          : FOULODER_ICON.lv4,
      name: (
        <span>
          NH<sub>3</sub>
        </span>
      ),
      value: data.nh3,
      unit: 'ppm',
    },
    {
      icon:
        data.co <= 10
          ? FOULODER_ICON.lv1
          : data.co > 11 && data.co <= 20
          ? FOULODER_ICON.lv2
          : data.co > 21 && data.co < 31
          ? FOULODER_ICON.lv3
          : FOULODER_ICON.lv4,
      name: 'CO',
      value: data.co,
      unit: 'ppm',
    },
    {
      icon:
        data.h2s <= 10
          ? FOULODER_ICON.lv1
          : data.h2s > 11 && data.h2s <= 20
          ? FOULODER_ICON.lv2
          : data.h2s > 21 && data.h2s < 31
          ? FOULODER_ICON.lv3
          : FOULODER_ICON.lv4,
      name: (
        <span>
          H<sub>2</sub>S
        </span>
      ),
      value: data.h2s,
      unit: 'ppm',
    },
    {
      icon:
        data.toluene <= 10
          ? FOULODER_ICON.lv1
          : data.toluene > 11 && data.toluene <= 20
          ? FOULODER_ICON.lv2
          : data.toluene > 21 && data.toluene < 31
          ? FOULODER_ICON.lv3
          : FOULODER_ICON.lv4,
      name: 'Toluene',
      value: data.toluene,
      unit: 'ppm',
    },
  ];

  if (!data.nh3 || !data.co || !data.h2s || !data.toluene) return null;
  return (
    <ul className="markerTable on">
      {/*에러가 없으면 markerTable에 on이 들어와야합니다.*/}
      {FOULODER_ITEM.map((item, index) => (
        <InfoItem
          icon={item.icon}
          name={item.name}
          value={item.value}
          unit={item.unit}
          key={index}
        />
      ))}
    </ul>
  );
};

export default FoulOderInfo;
