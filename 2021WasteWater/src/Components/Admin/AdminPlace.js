import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubTitle from '../Common/SubTitle';
import SearchBar from '../Common/SearchBar';
import ImgWrap from './ImgWrap';
import SamllTitleBar from '../Common/SamllTitleBar';
import AdminTableWrap from '../Common/Table/AdminTableWrap';

import * as adminAPI from '../../lib/api/admin';
import { updateModalKind, updateModalOpen } from '../../modules/common';
import { getStationData } from '../../modules/admin';

const AdminPlace = () => {
  const station = useSelector((state) => state.common.selectedStation);
  const { stationInfo, stationImage, sensorInfo } = useSelector((state) => ({
    stationInfo: state.admin.stationData,
    stationImage: state.admin.stationImage,
    sensorInfo: state.admin.sensorData,
  }));
  const selectedImg = useRef([]);
  const dispatch = useDispatch();

  const handleImgUploadBtnClick = () => {
    dispatch(updateModalKind('image'));
    dispatch(updateModalOpen(true));
  };

  const handleCheck = (e) => {
    const _checked = e.target.checked;
    const _selectedId = e.target.id;
    if (_checked) {
      selectedImg.current.push(_selectedId);
    } else {
      selectedImg.current = selectedImg.current.filter(
        (id) => id !== _selectedId
      );
    }
  };

  const handleImgDelete = () => {
    if (selectedImg.current.length === 0) {
      alert('선택한 사진이 없습니다.');
      return;
    }
    const conf = window.confirm('선택하신 사진을 삭제하시겠습니까?');
    if (conf) {
      const form = new FormData();
      form.append('list', selectedImg.current);
      adminAPI
        .deleteStationImg(form)
        .then(() => {
          alert('사진 삭제가 완료되었습니다.');
        })
        .catch((e) => {
          console.error('deleteStationImage error');
          console.error(e);
        });
    }
  };

  useEffect(() => {
    dispatch(getStationData(station));

    return () => {
      selectedImg.current = [];
    };
  }, [station, dispatch]);

  return (
    <>
      <div className="admin1Wrap">
        <SubTitle title="측정소 정보 관리" />
        <SearchBar />
        <SamllTitleBar title="측정소 정보" />
        <AdminTableWrap flag="station" data={stationInfo} />
        <SamllTitleBar
          title="측정 센서 설치 사진"
          icon={['delete', 'upload']}
          firstOnClick={handleImgDelete}
          secOnClick={handleImgUploadBtnClick}
        />
        <div className="imgBox">
          <ImgWrap data={stationImage} handleCheck={handleCheck} />
        </div>
        <SamllTitleBar title="센서 정보" />
        <AdminTableWrap flag="sensor" data={sensorInfo} />
      </div>
    </>
  );
};

export default AdminPlace;
