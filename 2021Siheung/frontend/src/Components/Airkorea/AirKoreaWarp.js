import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AirKorea from './AirKorea';
import Loading from '../../Pages/Loading';

const AirKoreaWarp = () => {
  const URL =
    //'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty';
    '/airKorea';
  const SERVICE_KEY =
    'Ywsop%2FISb7NsrdLu%2F5b3H0FVznn00Uo5A6SQST7J1QGq9wAUWahujcW8NCVs5admqKtuGkuEix3OE%2BY7QCzzDw%3D%3D';
  const DATA_TERM = 'DAILY';
  const RETURN_TYPE = 'json';
  const VER = '1.0';
  const NUMBER_OF_ROWS = '24';

  const [daeyaData, setDaeyaData] = useState();
  const [mokgamData, setMokgamData] = useState();
  const [sihwaData, setSihwaData] = useState();
  const [jungwangData, setJungwangData] = useState();
  const [janghyeonData, setJanghyeonData] = useState();

  const getSihwaData = useCallback(async (cancleToken) => {
    const STATION_NAME = '시화산단';
    const requestURL = `${URL}?serviceKey=${SERVICE_KEY}&returnType=${RETURN_TYPE}&stationName=${STATION_NAME}&dataTerm=${DATA_TERM}&ver=${VER}&numOfRows=${NUMBER_OF_ROWS}`;
    const result = [];

    await axios
      .get(requestURL, { cancelToken: cancleToken.token })
      .then((response) => {
        response.data.response.body.items.forEach((element) => {
          const data = {
            dataTime: element.dataTime,
            pm25Val: element.pm25Value,
          };
          result.push(data);
        });
        setSihwaData(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const getJungwangData = useCallback(async (cancleToken) => {
    const STATION_NAME = '정왕동';
    const requestURL = `${URL}?serviceKey=${SERVICE_KEY}&returnType=${RETURN_TYPE}&stationName=${STATION_NAME}&dataTerm=${DATA_TERM}&ver=${VER}&numOfRows=${NUMBER_OF_ROWS}`;
    const result = [];

    await axios
      .get(requestURL, { cancelToken: cancleToken.token })
      .then((response) => {
        response.data.response.body.items.forEach((element) => {
          const data = {
            dataTime: element.dataTime,
            pm25Val: element.pm25Value,
          };
          result.push(data);
        });
        setJungwangData(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const getMokgamData = useCallback(async (cancleToken) => {
    const STATION_NAME = '목감동';
    const requestURL = `${URL}?serviceKey=${SERVICE_KEY}&returnType=${RETURN_TYPE}&stationName=${STATION_NAME}&dataTerm=${DATA_TERM}&ver=${VER}&numOfRows=${NUMBER_OF_ROWS}`;
    const result = [];

    await axios
      .get(requestURL, { cancelToken: cancleToken.token })
      .then((response) => {
        response.data.response.body.items.forEach((element) => {
          const data = {
            dataTime: element.dataTime,
            pm25Val: element.pm25Value,
          };
          result.push(data);
        });
        setMokgamData(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const getDaeyaData = useCallback(async (cancleToken) => {
    const STATION_NAME = '대야동';
    const requestURL = `${URL}?serviceKey=${SERVICE_KEY}&returnType=${RETURN_TYPE}&stationName=${STATION_NAME}&dataTerm=${DATA_TERM}&ver=${VER}&numOfRows=${NUMBER_OF_ROWS}`;
    const result = [];

    await axios
      .get(requestURL, { cancelToken: cancleToken.token })
      .then((response) => {
        response.data.response.body.items.forEach((element) => {
          const data = {
            dataTime: element.dataTime,
            pm25Val: element.pm25Value,
          };
          result.push(data);
        });
        setDaeyaData(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const getJanghyeonData = useCallback(async (cancleToken) => {
    const STATION_NAME = '장현동';
    const requestURL = `${URL}?serviceKey=${SERVICE_KEY}&returnType=${RETURN_TYPE}&stationName=${STATION_NAME}&dataTerm=${DATA_TERM}&ver=${VER}&numOfRows=${NUMBER_OF_ROWS}`;
    const result = [];

    await axios
      .get(requestURL, { cancelToken: cancleToken.token })
      .then((response) => {
        response.data.response.body.items.forEach((element) => {
          const data = {
            dataTime: element.dataTime,
            pm25Val: element.pm25Value,
          };
          result.push(data);
        });
        setJanghyeonData(result);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const cancleToken = axios.CancelToken.source();

    getDaeyaData(cancleToken);
    getMokgamData(cancleToken);
    getSihwaData(cancleToken);
    getJungwangData(cancleToken);
    getJanghyeonData(cancleToken);
  }, [
    getSihwaData,
    getJungwangData,
    getMokgamData,
    getDaeyaData,
    getJanghyeonData,
  ]);

  if (
    !sihwaData ||
    !jungwangData ||
    !janghyeonData ||
    !mokgamData ||
    !daeyaData
  )
    return <Loading />;
  return (
    <AirKorea
      sihwaData={sihwaData}
      jungwangData={jungwangData}
      janghyeonData={janghyeonData}
      mokgamData={mokgamData}
      daeyaData={daeyaData}
    />
  );
};

export default AirKoreaWarp;
