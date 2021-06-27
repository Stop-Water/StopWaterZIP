import React from 'react';
import InfoItem from './InfoItem';

const QUALITY_ICON = {
  lv1: (
    <svg className="markerIcon" viewBox="0 0 44 44">
      <g transform="translate(-5206.298 8976.04)">
        <g transform="translate(4299.298 -9358.04)">
          <g transform="translate(324 -547)">
            <path
              d="M22,0A22,22,0,1,1,0,22,22,22,0,0,1,22,0Z"
              transform="translate(583 929)"
              fill="#42b1fa"
            />
          </g>
        </g>
        <path
          d="M10.544,1.135a1.56,1.56,0,0,0-3,0C5.139,9.241,0,11.443,0,17.157a9.092,9.092,0,0,0,9.043,9.151,9.092,9.092,0,0,0,9.043-9.151C18.086,11.415,12.959,9.278,10.544,1.135Zm-1.5,21.884a5.762,5.762,0,0,1-5.755-5.755.822.822,0,1,1,1.644,0,4.115,4.115,0,0,0,4.11,4.111.822.822,0,0,1,0,1.644Z"
          transform="translate(5219.298 -8967.039)"
          fill="#fff"
        />
      </g>
    </svg>
  ),
  lv2: (
    <svg className="markerIcon" viewBox="0 0 44 44">
      <g transform="translate(-5206.298 8976.04)">
        <g transform="translate(4299.298 -9358.04)">
          <g transform="translate(324 -547)">
            <path
              d="M22,0A22,22,0,1,1,0,22,22,22,0,0,1,22,0Z"
              transform="translate(583 929)"
              fill="#7BDFA6"
            />
          </g>
        </g>
        <path
          d="M10.544,1.135a1.56,1.56,0,0,0-3,0C5.139,9.241,0,11.443,0,17.157a9.092,9.092,0,0,0,9.043,9.151,9.092,9.092,0,0,0,9.043-9.151C18.086,11.415,12.959,9.278,10.544,1.135Zm-1.5,21.884a5.762,5.762,0,0,1-5.755-5.755.822.822,0,1,1,1.644,0,4.115,4.115,0,0,0,4.11,4.111.822.822,0,0,1,0,1.644Z"
          transform="translate(5219.298 -8967.039)"
          fill="#fff"
        />
      </g>
    </svg>
  ),
  lv3: (
    <svg className="markerIcon" viewBox="0 0 44 44">
      <g transform="translate(-5206.298 8976.04)">
        <g transform="translate(4299.298 -9358.04)">
          <g transform="translate(324 -547)">
            <path
              d="M22,0A22,22,0,1,1,0,22,22,22,0,0,1,22,0Z"
              transform="translate(583 929)"
              fill="#FFCC27"
            />
          </g>
        </g>
        <path
          d="M10.544,1.135a1.56,1.56,0,0,0-3,0C5.139,9.241,0,11.443,0,17.157a9.092,9.092,0,0,0,9.043,9.151,9.092,9.092,0,0,0,9.043-9.151C18.086,11.415,12.959,9.278,10.544,1.135Zm-1.5,21.884a5.762,5.762,0,0,1-5.755-5.755.822.822,0,1,1,1.644,0,4.115,4.115,0,0,0,4.11,4.111.822.822,0,0,1,0,1.644Z"
          transform="translate(5219.298 -8967.039)"
          fill="#fff"
        />
      </g>
    </svg>
  ),
  lv4: (
    <svg className="markerIcon" viewBox="0 0 44 44">
      <g transform="translate(-5206.298 8976.04)">
        <g transform="translate(4299.298 -9358.04)">
          <g transform="translate(324 -547)">
            <path
              d="M22,0A22,22,0,1,1,0,22,22,22,0,0,1,22,0Z"
              transform="translate(583 929)"
              fill="#FE626F"
            />
          </g>
        </g>
        <path
          d="M10.544,1.135a1.56,1.56,0,0,0-3,0C5.139,9.241,0,11.443,0,17.157a9.092,9.092,0,0,0,9.043,9.151,9.092,9.092,0,0,0,9.043-9.151C18.086,11.415,12.959,9.278,10.544,1.135Zm-1.5,21.884a5.762,5.762,0,0,1-5.755-5.755.822.822,0,1,1,1.644,0,4.115,4.115,0,0,0,4.11,4.111.822.822,0,0,1,0,1.644Z"
          transform="translate(5219.298 -8967.039)"
          fill="#fff"
        />
      </g>
    </svg>
  ),
};
const QualityInfo = ({ data }) => {
  const QUALITY_ITEM = {
    icon:
      data.qltwtr <= 10
        ? QUALITY_ICON.lv1
        : data.qltwtr > 11 && data.qltwtr <= 20
        ? QUALITY_ICON.lv2
        : data.qltwtr > 21 && data.qltwtr < 31
        ? QUALITY_ICON.lv3
        : QUALITY_ICON.lv4,
    name: '수질',
    value: data.qltwtr,
    unit: 'mg/l',
  };

  if (!data.qltwtr) return null;
  return (
    <ul className="markerTable on">
      {/*에러가 없으면 markerTable에 on이 들어와야합니다.*/}
      <InfoItem
        icon={QUALITY_ITEM.icon}
        name={QUALITY_ITEM.name}
        value={QUALITY_ITEM.value}
        unit={QUALITY_ITEM.unit}
        key={QUALITY_ITEM.name}
      />
    </ul>
  );
};

export default QualityInfo;
