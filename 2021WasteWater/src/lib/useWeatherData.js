import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';

import { selectWeatherData } from './api/common';
import { convertXY } from './convertXY';

const useWeatherData = (x, y) => {
  const [weatherData, setWeatherData] = useState(null);
  const date = new Date();
  const convertedXY = convertXY('toXY', x, y);

  const curDate = moment(date).format('YYYYMMDD');
  const baseTime =
    moment(date).format('mm') < 30
      ? moment(date).add(-1, 'h').format('HH00')
      : moment(date).format('HH00');
  const fcstTime =
    moment(date).format('HH') === '23'
      ? '0000'
      : moment(date).add(1, 'h').format('HH00');

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const reqBody = {
      serviceKey: process.env.REACT_APP_WEATHER_KEY,
      date: curDate,
      time: baseTime,
      curX: convertedXY.x,
      curY: convertedXY.y,
    };

    selectWeatherData(cancelToken.token, reqBody)
      .then((response) => {
        const result = response.data.response.body.items.item.filter(
          (data) => data.fcstTime === fcstTime
        );
        const temperature = result.filter((data) => data.category === 'T1H')[0]
          .fcstValue;
        const humidity = result.filter((data) => data.category === 'REH')[0]
          .fcstValue;
        let sky = result.filter((data) => data.category === 'SKY')[0].fcstValue;
        const rain = result.filter((data) => data.category === 'PTY')[0]
          .fcstValue;

        if (rain !== null && rain !== '0') sky = rain;
        setWeatherData({
          temp: temperature,
          hum: humidity,
          sky: sky,
          ratin: rain,
        });
      })
      .catch((e) => {
        console.error('selectWeatherData error');
        console.error(e);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [curDate, baseTime, fcstTime, convertedXY.x, convertedXY.y]);

  return weatherData;
};

export default useWeatherData;
