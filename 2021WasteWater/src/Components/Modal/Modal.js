import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sensor from './Sensor';
import { updateModalKind, updateModalOpen } from '../../modules/common';
import { Scrollbars } from 'react-custom-scrollbars-2';

import './scss/Modal.scss';
import {
  updateKindId,
  updateSensorId,
  updateStationId,
} from '../../modules/admin';
import ImgUpload from './ImgUpload';
import Privacy from './Privacy';
import Copyright from './Copyright';
import NoEmail from './NoEmail';
import Terms from './Terms';

const Modal = () => {
  const dispatch = useDispatch();
  const modalKind = useSelector((state) => state.common.modalKind);

  const handleModalClose = () => {
    dispatch(updateSensorId(null));
    dispatch(updateStationId(null));
    dispatch(updateKindId(null));
    dispatch(updateModalKind(null));
    dispatch(updateModalOpen(false));
  };

  return (
    <div className="modalWrap">
      <div className="modalContainer">
        <div className="modalHeader">
          {/* 모달팝업 내용에 따라 타이틀이 달라집니다. */}
          <div className="modalTitle">
            {modalKind === 'sensor' && '· 센서 상세이력 조회 및 수정'}
            {modalKind === 'image' && '· 이미지 업로드'}
            {modalKind === 'privacy' && '· 개인정보처리방침'}
            {modalKind === 'noEmail' && '· 이메일무단수집거부'}
            {modalKind === 'copyright' && '· 저작권보호및정책'}
            {modalKind === 'terms' && '· 이용약관'}
          </div>
          <div className="modalXbtn" onClick={handleModalClose}>
            <svg viewBox="0 0 17.959 17.959">
              <g transform="translate(0.141 -0.012)">
                <path
                  d="M1.009.009,22.19.19a1.03,1.03,0,0,1,1.017,1.017.988.988,0,0,1-1,1L1.026,2.026A1.03,1.03,0,0,1,.009,1.009.988.988,0,0,1,1.009.009Z"
                  transform="translate(1.414 0) rotate(45)"
                />
                <path
                  d="M1.009-.009,22.19-.19a.988.988,0,0,1,1,1,1.03,1.03,0,0,1-1.017,1.017L.991,2.009a.988.988,0,0,1-1-1A1.03,1.03,0,0,1,1.009-.009Z"
                  transform="translate(0 16.545) rotate(-45)"
                />
              </g>
            </svg>
          </div>
        </div>
        {/* 모달팝업 내용이 변경됩니다. */}
        <Scrollbars
          className="modalContents"
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
          {modalKind === 'sensor' && <Sensor />}
          {modalKind === 'image' && <ImgUpload />}
          {modalKind === 'privacy' && <Privacy />}
          {modalKind === 'noEmail' && <NoEmail />}
          {modalKind === 'copyright' && <Copyright />}
          {modalKind === 'terms' && <Terms />}
        </Scrollbars>
        <div className="modalFooter">
          <button className="modalCloseBtn" onClick={handleModalClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
