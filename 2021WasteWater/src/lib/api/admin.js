import client from './client';

export const selectStationInfo = (station) =>
  client.get('/obsrvt-info', {
    params: {
      obsrvtId: station,
    },
  });

export const selectSensorHistory = (cancelToken, stationId, sensorId, kindId) =>
  client.get('/obsrvt-sensor-hist', {
    params: {
      obsrvtId: stationId,
      snsrId: sensorId,
      snsrKndCd: kindId,
    },
    cancelToken: cancelToken,
  });

export const insertSensorHistory = (cancelToken, form) =>
  client.post('/obsrvt-sensor-hist', form, {
    cancelToken: cancelToken,
  });

export const insertSensorHistoryFile = (cancelToken, form) =>
  client.post('/file-upload', form, {
    cancelToken: cancelToken,
  });

export const selectUserGroup = (cancelToken) =>
  client.get('/user-pstn-list', {
    cancelToken: cancelToken,
  });

export const selectUserData = (cancelToken, mngrCd) =>
  client.get('/user-info', {
    params: {
      mngrCd: mngrCd,
    },
    cancelToken: cancelToken,
  });

export const uploadStationImg = (form) => client.post('/file-upload', form);

export const insertStationImg = (form) => client.post('/obsrvt-file', form);

export const deleteStationImg = (form) =>
  client.post('/obsrvt-delete-file', form);

export const selectErrorData = (stationId, startDate, endDate, type) =>
  client.get('/sensor-error-data-detail', {
    params: {
      type: type,
      beDate: startDate,
      afDate: endDate,
      obsrvtId: stationId,
    },
  });
