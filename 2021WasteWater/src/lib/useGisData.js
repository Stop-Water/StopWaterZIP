import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectGisData } from './api/gis';
import { updateLoading } from '../modules/common';

const useGisData = (flag, station) => {
  const dispatch = useDispatch();
  const [gisData, setGisData] = useState(null);
  const _flag = useRef(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (flag === 'quality') {
      _flag.current = 'qltwtr-data';
    } else if (flag === 'foulOder') {
      _flag.current = 'bsml-data';
    } else {
      _flag.current = 'flux-data';
    }

    selectGisData(cancelToken.token, _flag.current, station)
      .then((response) => {
        setGisData(response.data.data);
      })
      .catch((e) => {
        console.error('selectGisData error');
        console.error(e);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [flag, station, dispatch]);

  return gisData;
};

export default useGisData;
