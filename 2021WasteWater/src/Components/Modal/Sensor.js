import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import useSensorHistory from '../../lib/useSensorHistory';
import TableWrap from '../Common/Table/TableWrap';
import AdminTableWrap from '../Common/Table/AdminTableWrap';
import SamllTitleBar from '../Common/SamllTitleBar';
import * as adminAPI from '../../lib/api/admin';

import './scss/ImgUpload.scss';

const Sensor = () => {
  const operNmRef = useRef();
  const fileRef = useRef();
  const fileNmRef = useRef();
  const operCmRef = useRef();
  const operIdRef = useRef();

  const { stationId, sensorId, kindId } = useSelector((state) => ({
    stationId: state.admin.stationId,
    sensorId: state.admin.sensorId,
    kindId: state.admin.kindId,
  }));

  const sensorHistory = useSensorHistory(stationId, sensorId, kindId);

  const insertHistory = (cancelToken, data) => {
    adminAPI
      .insertSensorHistory(cancelToken, data)
      .then((response) => {
        if (response.data.result === 'success') {
          alert('작업이력 등록 성공');
        } else {
          window.alert('기존에 사용했던 기기ID입니다.');
        }
      })
      .catch((e) => {
        console.error('insertSensorHistory error');
        console.error(e);
      });
  };

  const handleSaveHitory = () => {
    const confirm = window.confirm('센서 이력을 저장하시겠습니까?');
    if (confirm) {
      const operator = operNmRef.current.value;
      const operComment = operCmRef.current.value;
      const operId = operIdRef.current.value.trim()
        ? operIdRef.current.value
        : sensorId;
      const file = fileRef.current.files[0];
      const cancelToken = axios.CancelToken.source();
      const fileForm = new FormData();
      const dataForm = new FormData();

      dataForm.append('obsrvtId', stationId);
      dataForm.append('snsrId', sensorId);
      dataForm.append('snsrKndCd', kindId);
      dataForm.append('oprtNm', operator);
      dataForm.append('oprtCn', operComment);
      dataForm.append('newSnsrId', operId);

      if (file) {
        fileForm.append('files', file);
        adminAPI
          .insertSensorHistoryFile(cancelToken.token, fileForm)
          .then((response) => {
            const fileId = response.data.data;
            dataForm.append('fileList', fileId);
            insertHistory(cancelToken.token, dataForm);
          })
          .catch((e) => {
            console.error('insertSensorHistoryFile error');
            console.error(e);
          });
      } else {
        dataForm.append('fileList', null);
        insertHistory(cancelToken.token, dataForm);
      }
    }
  };

  const checkNull = () => {
    const operator = operNmRef.current.value.trim();
    const operComment = operCmRef.current.value.trim();
    if (!operator || !operComment) {
      alert('작업자와 작업내용은 필수 입력란입니다.');
    } else {
      handleSaveHitory();
    }
  };

  return (
    <div className="sensorWrap">
      <SamllTitleBar title="센서 상세 이력" />
      <TableWrap flag="sensor" data={sensorHistory} />
      <SamllTitleBar
        title="센서 이력 입력"
        icon={[null, 'save']}
        secOnClick={checkNull}
      />
      <AdminTableWrap
        flag="sensorHistory"
        data={sensorHistory}
        reff={{
          operNm: operNmRef,
          operCm: operCmRef,
          file: fileRef,
          fileNm: fileNmRef,
          operId: operIdRef,
        }}
      />
    </div>
  );
};

export default Sensor;
