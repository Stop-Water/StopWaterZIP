import React from 'react';
import { useDispatch } from 'react-redux';
import { updateIsLegendOpen } from '../../../modules/gisMenu';

const MapLegendBtn = ({ isLegendOpen }) => {
  const dispatch = useDispatch();

  const handleLegengBtnClick = () => {
    dispatch(updateIsLegendOpen(!isLegendOpen));
  };

  return (
    <div
      className={isLegendOpen ? 'legendBtn on' : 'legendBtn'}
      onClick={handleLegengBtnClick}
    >
      {/*클릭하면 자신과 legendMenuContainer, legendContainer가 on 됩니다.*/}
      <div className="infoIcon">
        <svg viewBox="0 0 15.84 15.84">
          <path
            d="M15.92,8a7.92,7.92,0,1,0,7.92,7.92A7.921,7.921,0,0,0,15.92,8Zm0,3.513a1.341,1.341,0,1,1-1.341,1.341A1.341,1.341,0,0,1,15.92,11.513Zm1.788,8.112a.383.383,0,0,1-.383.383h-2.81a.383.383,0,0,1-.383-.383v-.766a.383.383,0,0,1,.383-.383H14.9V16.431h-.383a.383.383,0,0,1-.383-.383v-.766a.383.383,0,0,1,.383-.383h2.044a.383.383,0,0,1,.383.383v3.194h.383a.383.383,0,0,1,.383.383Z"
            transform="translate(-8 -8)"
          />
        </svg>
      </div>
      <div className="legendTitle">범례</div>
    </div>
  );
};

export default MapLegendBtn;
