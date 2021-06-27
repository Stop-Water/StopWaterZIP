import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import ImgBox from './ImgBox';
import './scss/ImgBox.scss';

const ImgWrap = ({ data, handleCheck }) => {
  return (
    <div className="imgBoxWrap boxFrame">
      <div className="frameLine"></div>
      <Scrollbars
        className="imgBoxContainer"
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
      >
        {data && data.length > 0 ? (
          data.map((img) => (
            <ImgBox
              url={img.thumb}
              id={img.fileId}
              key={img.fileId}
              handleCheck={handleCheck}
            />
          ))
        ) : (
          <>
            <ImgBox />
            <ImgBox />
            <ImgBox />
            <ImgBox />
          </>
        )}
      </Scrollbars>
    </div>
  );
};

export default ImgWrap;
