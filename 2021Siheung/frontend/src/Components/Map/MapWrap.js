import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Pages/Loading';
import NaverMap from './NaverMap';

const MapWrap = () => {
  const [sensorData, setSensorData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const cctvData = [
    {
      name: '포동사거리',
      lon: 126.788517,
      lat: 37.40854,
      url: 'wss://www.aiotservice.co.kr:11004/socketSecure/1004',
    },
    {
      name: '상곡교차로',
      lon: 126.756545,
      lat: 37.388562,
      url: 'wss://www.aiotservice.co.kr:11006/socketSecure/1006',
    },
    {
      name: '둔대교차로',
      lon: 126.805362,
      lat: 37.386124,
      url: 'wss://www.aiotservice.co.kr:11007/socketSecure/1007',
    },
    {
      name: '한국기계거래소',
      lon: 126.690128,
      lat: 37.33103,
      url: 'wss://www.aiotservice.co.kr:14001/socketSecure/4001',
    },
    {
      name: '한라비발디캠퍼스',
      lon: 126.70996,
      lat: 37.362196,
      url: 'wss://www.aiotservice.co.kr:17006/socketSecure/7006',
    },
  ];

  useEffect(() => {
    const cancleToken = axios.CancelToken.source();
    setIsLoading(true);

    const getSesnsorData = async () => {
      const URL = '/api/sensorData';
      await axios
        .get(URL, {
          cancelToken: cancleToken.token,
        })
        .then((response) => {
          setSensorData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getSesnsorData();

    return () => {
      cancleToken.cancel();
    };
  }, []);

  if (!sensorData && !isLoading) return null;
  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <NaverMap data={sensorData} cctvData={cctvData} />
      )}
    </>
  );
};

export default MapWrap;
