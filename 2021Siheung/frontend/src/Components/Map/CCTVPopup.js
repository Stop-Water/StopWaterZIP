import React, { useEffect, useRef, useCallback } from 'react';
import JSMpeg from 'jsmpeg-player';
import { faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCapture } from 'react-capture';
import BlueBtn from '../Common/BuleButtons';

const CCTVPopup = ({ name, data, close }) => {
  const cctvRef = useRef();
  const cctvWrapRef = useRef();
  const { snap } = useCapture();

  const BlueButton = BlueBtn.cap;

  useEffect(() => {
    const cctvWrap = cctvWrapRef.current;
    const cctv = cctvRef.current;

    let player = '';
    if (data) {
      player = new JSMpeg.Player(data, {
        canvas: cctv,
        autoplay: true,
        preserveDrawingBuffer: true,
      });
    }

    return () => {
      const agent = navigator.userAgent.toLowerCase();

      if (
        (navigator.appName === 'Netscape' &&
          navigator.userAgent.search('Trident') !== -1) ||
        agent.indexOf('msie') !== -1
      ) {
        player.source.destroy();
        cctvWrap.removeChild(cctv);
      } else {
        player.destroy();
      }
    };
  }, [name, data]);

  const handleCapture = useCallback(() => {
    const agent = navigator.userAgent.toLowerCase();

    if (
      (navigator.appName === 'Netscape' &&
        navigator.userAgent.search('Trident') !== -1) ||
      agent.indexOf('msie') !== -1
    ) {
      alert(
        '해당 기능은 익스플로러 브라우저에서 지원하지 않습니다. 타 브라우저로 접속바랍니다.',
      );
    } else {
      const currentWidth = cctvRef.current.style.width;
      const currentHeight = cctvRef.current.style.height;
      cctvRef.current.style.width = '100%';
      cctvRef.current.style.height = '100%';
      snap(cctvRef, { file: 'capture.png' });
      cctvRef.current.style.width = currentWidth;
      cctvRef.current.style.height = currentHeight;
    }
  }, [snap, cctvRef]);

  return (
    <div className="cctvWrap">
      <div className="cctvPopBG" onClick={close}></div>

      <div className="cctvPop" ref={cctvWrapRef}>
        <div className="tit">
          <h2>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#333" />
            &ensp; {name}
          </h2>
          <BlueButton onClick={handleCapture}>캡처</BlueButton>
          <span>
            <FontAwesomeIcon icon={faTimes} color="#333" onClick={close} />
          </span>
        </div>
        <canvas className="cctvVideo" ref={cctvRef}></canvas>
      </div>
    </div>
  );
};

export default CCTVPopup;
