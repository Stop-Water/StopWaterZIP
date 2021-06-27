import React from 'react';
import { useDispatch } from 'react-redux';

import { updateModalKind, updateModalOpen } from '../../../modules/common';
import {
  updateKindId,
  updateSensorId,
  updateStationId,
} from '../../../modules/admin';
const AdminTableItem = ({ title, value, modifiable, data }) => {
  const dispatch = useDispatch();

  const handleModalOpen = (e) => {
    dispatch(updateSensorId(e.target.dataset.sensorid));
    dispatch(updateStationId(e.target.dataset.stationid));
    dispatch(updateKindId(e.target.dataset.kindid));
    dispatch(updateModalKind('sensor'));
    dispatch(updateModalOpen(true));
  };

  return (
    <div className="tableRow">
      <div className="tableCell">{title}</div>
      <div className="tableCell">{value}</div>
      {data && (
        <button
          className={'modifyBtn ' + (modifiable ? 'on' : '')}
          data-sensorid={data.snsrId}
          data-stationid={data.obsrvtId}
          data-kindid={data.snsrKndCd}
          onClick={handleModalOpen}
        >
          조회/수정
        </button>
      )}
      {/* modifyBtn에 on이 들어가면 조회/수정 버튼이 보입니다. */}
    </div>
  );
};

export default AdminTableItem;
