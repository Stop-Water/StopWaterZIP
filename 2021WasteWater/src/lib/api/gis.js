import client from './client';

export const selectGisData = (cancelToken, flag, station) =>
  client.get(`/${flag}/${station}`, { cancelToken: cancelToken });
