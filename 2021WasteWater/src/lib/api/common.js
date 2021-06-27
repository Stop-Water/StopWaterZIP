import client from './client';

export const selectStationList = (cancelToken) =>
  client.get('/obsrvt-list', { cancelToken: cancelToken });

export const selectWeatherData = (cancelToken, reqBody) =>
  client.post(`/weather-data`, reqBody, {
    headers: {
      'content-type': 'application/json',
    },
    cancelToken: cancelToken,
  });
