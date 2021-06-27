import React from 'react';
import { useSelector } from 'react-redux';

import Background from '../Components/Common/Background';
import Modal from '../Components/Modal/Modal';

const ModalPage = () => {
  const isModalOpen = useSelector((state) => state.common.isModalOpen);
  return (
    <>
      {isModalOpen ? (
        <div className="modalPage">
          <Background />
          <Modal />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalPage;
