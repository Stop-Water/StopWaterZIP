import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { selectStationList } from './api/common';
import { updateLoading } from '../modules/common';

const useStationList = () => {
  const [stationList, setStationList] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    dispatch(updateLoading(true));

    selectStationList(cancelToken.token)
      .then((response) => {
        setStationList(response.data.data);
        dispatch(updateLoading(false));
      })
      .catch((e) => {
        console.error('selectStationList error');
        console.error(e);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return stationList;
};

export default useStationList;
