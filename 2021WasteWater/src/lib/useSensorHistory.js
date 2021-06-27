import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import { selectSensorHistory } from './api/admin';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../modules/common';

const useSensorHitory = (stationId, sensorId, kindId) => {
  const [sensorHistory, setSensorHistory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    dispatch(updateLoading(true));

    selectSensorHistory(cancelToken.token, stationId, sensorId, kindId)
      .then((response) => {
        response.data.data &&
          response.data.data.forEach(
            (element) =>
              (element.oprtDt = moment(element.oprtDt).format(
                'YYYY년 MM월 DD일'
              ))
          );
        setSensorHistory(response.data.data);
        dispatch(updateLoading(false));
      })
      .catch((e) => {
        console.error('selectSensorHistory error');
        console.error(e);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [stationId, sensorId, kindId, dispatch]);

  return sensorHistory;
};

export default useSensorHitory;
