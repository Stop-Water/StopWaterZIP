import React, { useEffect, useRef } from 'react';

const ImgBox = ({ id, url, handleCheck }) => {
  const imgRef = useRef();

  useEffect(() => {
    if (url) {
      imgRef.current.style.backgroundImage = `url(data:image/jpeg;base64,${url})`;
    }
  }, [url]);

  return (
    <div className="imgContainer" ref={imgRef}>
      {/*이미지가 추가되면 imgContainer에 backgroud-image로 들어가면 됩니다.*/}
      <input type="checkbox" id={id} onClick={handleCheck}></input>
      <label htmlFor={id}></label>
    </div>
  );
};

export default ImgBox;
