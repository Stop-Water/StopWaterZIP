import client from './client';

export const selectStationList = (cancelToken) =>
  client.get('/admin/stationinfo', { cancelToken: cancelToken });

export const selectStation = (stationid, cancelToken) =>
  client.get(`/admin/selectstation/${stationid}`, {
    cancelToken: cancelToken,
  });

export const selectHistory = (stationid, cancelToken) =>
  client.get(`/admin/selecthistory/${stationid}`, {
    cancelToken: cancelToken,
  });

export const updateStation = (stationInfo) =>
  client.post('/admin/updatestation', stationInfo, {
    headers: { 'content-type': 'application/json' },
  });

export const updateSensor = (sensorInfo) =>
  client.post('/admin/updatesensor', sensorInfo, {
    headers: { 'content-type': 'application/json' },
  });

export const insertHistory = (history) =>
  client.post('/admin/inserthistory', history, {
    headers: { 'content-type': 'application/json' },
  });

export const deleteHistory = (history) =>
  client.post('/admin/deletehistory', history, {
    headers: { 'content-type': 'application/json' },
  });

export const selectImage = (stationId, cancleToken) =>
  client.get(`/admin/selectimage/${stationId}`, {
    cancelToken: cancleToken,
  });

export const getImage = (stationId, imgNo) =>
  client.get(`/admin/getimage/${stationId}/${imgNo}`, { responseType: 'blob' });

export const insertImage = (stationId, image) =>
  client.post(`/admin/storeimage/${stationId}`, image);

export const deleteImage = (img) =>
  client.post('/admin/deleteimage', img, {
    headers: { 'content-type': 'application/json' },
  });
