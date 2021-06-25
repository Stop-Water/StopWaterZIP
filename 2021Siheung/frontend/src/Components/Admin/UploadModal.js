import React, { useRef, useState } from 'react';
import * as adminAPI from '../../lib/api/admin';
import Bluebtn from '../Common/BuleButtons';
import './CSS/UploadModal.css';
import Modal from '@material-ui/core/Modal';
import Loading from '../../Pages/Loading';

const BlueButton = Bluebtn.default;

const UploadModal = ({
  isOpen,
  toggleModal,
  stationId,
  selectImage,
  setIsOpen,
}) => {
  const fileRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    const conf = window.confirm('이미지를 업로드 하시겠습니까?');
    if (conf) {
      setIsLoading(true);
      const form = new FormData();
      for (let i = 0; i < fileRef.current.files.length; i++) {
        form.append('files', fileRef.current.files[i]);
      }
      await adminAPI
        .insertImage(stationId, form)
        .then(() => {
          alert('이미지 업로드가 완료되었습니다.');
          setIsLoading(false);
          setIsOpen(false);
          selectImage(stationId);
        })
        .catch((error) => console.log(error));
    }
  };

  // 파일명 체크, 확장자 체크
  const handleChange = () => {
    const special = /[{}[\]/?,;:|)*~`!^\-_+_<>@$%&=('"]/gi;

    if (fileRef.current.files.length > 5) {
      alert('최대 첨부 파일 갯수는 5개 입니다.');
      fileRef.current.value = '';
    } else {
      for (let i = 0; i < fileRef.current.files.length; i++) {
        if (!/\.(gif|jpg|jpeg|png)$/i.test(fileRef.current.files[i].name)) {
          alert('이미지 파일만 업로드 가능합니다(gif, jpg, png)');
          fileRef.current.value = '';
        }
        if (special.test(fileRef.current.files[i].name)) {
          alert('파일 이름에는 특수문자가 들어갈 수 없습니다.');
          fileRef.current.value = '';
        }
      }
    }
  };

  const body = (
    <div className="MDmodal">
      <h1 className="modalHeader">이미지 업로드</h1>
      <div className="modalCont">
        <p className="modlaText">* 파일의 최대 첨부 갯수는 5개 입니다.</p>
        <div className="modalUploadBox">
          <input
            type="file"
            maxLength="3"
            ref={fileRef}
            onChange={handleChange}
            multiple="multiple"
          />
        </div>
      </div>

      <div className="TablePaging">
        <BlueButton onClick={handleUpload}>제출</BlueButton>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div>
        <Modal
          open={isOpen}
          onClose={toggleModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </>
  );
};

export default UploadModal;
