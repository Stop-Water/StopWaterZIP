import client from './client';

export const selectStatisticalData = (
  cancelToken,
  station,
  startDate,
  endDate,
  flag
) =>
  client.get('/chart-data', {
    params: {
      obsrvtId: station,
      beDate: startDate,
      afDate: endDate,
      type: flag,
    },
    cancelToken: cancelToken,
  });
