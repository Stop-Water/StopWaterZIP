import React from 'react';
import BlueBtn from '../Common/BuleButtons';

const BlueButton = BlueBtn.default;

const StationImage = ({
  imageURL,
  isLoading,
  handleImgDelete,
  toggleModal,
}) => {
  return (
    <div className="adminContWrap">
      <h2 className="adminTit">· 관측소 사진</h2>
      <div>
        {imageURL && !isLoading ? (
          imageURL.map((img, index) => (
            <div className="adminimgBox" key={index}>
              <img
                src={img.url}
                style={{ width: '260px', height: '260px' }}
                alt={index}
              />
              <div className="blackBox">
                <div className="removeBtn">
                  <a href="/#" id={img.id} onClick={handleImgDelete}>
                    삭제
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="clearBoth"></div>
      <div className="searchArea mt-4">
        <BlueButton onClick={toggleModal}>업로드</BlueButton>
      </div>
    </div>
  );
};

export default StationImage;
