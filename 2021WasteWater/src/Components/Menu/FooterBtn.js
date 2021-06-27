import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsFooterOpen } from '../../modules/menu';

const FooterBtn = () => {
  const dispatch = useDispatch();
  const isFooterOpen = useSelector((state) => state.menu.isFooterOpen);

  const handleFooterBtnClick = () => {
    dispatch(updateIsFooterOpen(!isFooterOpen));
  };

  return (
    <div className="footerBtn" onClick={handleFooterBtnClick}>
      <svg
        className="footerArrow"
        width="11.414"
        height="7.323"
        viewBox="0 0 11.414 7.323"
      >
        <g transform="translate(0.707 6.616) rotate(-90)">
          <path
            d="M5,0,4.091.909,7.532,4.351,8.172,5l-.639.649L4.091,9.091,5,10l5-5Z"
            transform="translate(-4.091)"
          />
        </g>
      </svg>

      <div className="showCopy">
        <span>{isFooterOpen ? 'Close' : 'Show'}</span>
        <span>Copyright</span>
      </div>
    </div>
  );
};

export default FooterBtn;
