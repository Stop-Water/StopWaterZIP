import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as adminAPI from '../../lib/api/admin';
import {
  updateLoading,
  updateModalKind,
  updateModalOpen,
} from '../../modules/common';
import { Scrollbars } from 'react-custom-scrollbars-2';

import '../Common/scss/BoxFrame.scss';
import './scss/ImgUpload.scss';
import './scss/FileUpload.scss';

const ImgUpload = () => {
  const fileRef = useRef();
  const fileNmRef = useRef();
  const [images, setImages] = useState([]);
  const stationId = useSelector((state) => state.common.selectedStation);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const special = /[{}[\]/?,;:|)*~`!^\-_+_<>@$%&=('"]/gi;

    if (e.target.files.length > 5) {
      alert('최대 첨부 파일 갯수는 5개 입니다.');
      fileRef.current.value = '';
    } else {
      for (const img of e.target.files) {
        if (special.test(img.name)) {
          alert('파일 이름에는 특수문자가 들어갈 수 없습니다.');
          fileRef.current.value = '';
        } else {
          fileNmRef.current.innerText = `파일 ${e.target.files.length}개`;
        }
      }
    }

    setImages([]);

    for (const img of e.target.files) {
      setImages((images) => [...images, img]);
    }
  };

  const handleUpload = () => {
    const conf = window.confirm('이미지를 업로드 하시겠습니까?');
    if (conf) {
      dispatch(updateLoading(true));
      const form = new FormData();
      for (const img of fileRef.current.files) {
        form.append('files', img);
      }
      adminAPI
        .uploadStationImg(form)
        .then((response) => {
          const uploadForm = new FormData();
          uploadForm.append('fileList', response.data.data);
          uploadForm.append('obsrvtId', stationId);

          adminAPI
            .insertStationImg(uploadForm)
            .then(() => {
              dispatch(updateLoading(false));
              alert('이미지가 업로드 되었습니다.');
              dispatch(updateModalOpen(false));
              dispatch(updateModalKind(null));
            })
            .catch((e) => {
              console.error('insertStationImg error');
              console.error(e);
            });
        })
        .catch((e) => {
          console.error('uploadStationImg error');
          console.error(e);
        });
    }
  };

  return (
    <div className="imgUploadWrap">
      <label htmlFor="file">
        파일 선택
        <input
          type="file"
          id="file"
          maxLength="5"
          multiple="multiple"
          ref={fileRef}
          onChange={handleChange}
          accept=".jpg, jpeg, .png, .gif"
        />
        <span className="fileText" ref={fileNmRef}>
          파일을 선택해주세요
        </span>
      </label>
      <p className="fileT">* 파일의 최대 첨부 갯수는 5개 입니다.</p>
      <p className="fileT">* jpg, jpeg, png, gif 확장자만 업로드 가능합니다.</p>
      {images.length > 0 && (
        <div>
          <div className="previewWrap boxFrame">
            <div className="frameLine"></div>
            <Scrollbars
              className="previewBoxWrap"
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
              {images.map((image, index) => (
                <div key={index} className="previewBox">
                  <img src={URL.createObjectURL(image)} />
                  <span>{image.name}</span>
                </div>
              ))}
            </Scrollbars>
          </div>
          <button onClick={handleUpload} className="fileBtn">
            등록
          </button>
        </div>
      )}
    </div>
  );
};

export default ImgUpload;
