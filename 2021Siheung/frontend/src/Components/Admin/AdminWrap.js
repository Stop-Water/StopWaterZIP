import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { check } from '../../modules/user';
import Admin from './Admin';
import axios from 'axios';
import * as adminAPI from '../../lib/api/admin';

const AdminWrap = () => {
  const [sensorData, setSensorData] = useState();
  const dispatch = useDispatch();

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  useEffect(() => {
    dispatch(check());

    const cancleToken = axios.CancelToken.source();
    const getStationList = async () => {
      await adminAPI
        .selectStationList(cancleToken.token)
        .then((response) => {
          setSensorData(modifyData(response.data));
        })
        .catch((error) => {
          console.log('selectStationList error');
          console.log(error);
        });
    };

    getStationList();

    return () => {
      cancleToken.cancel();
    };
  }, [dispatch]);

  const modifyData = (data) => {
    const option = [];

    data.forEach((element) => {
      const nameData = {
        label: element.station_nm,
        value: element.station_id,
      };
      option.push(nameData);
    });
    return option;
  };

  if (!sensorData || !user) {
    return null;
  }
  return <Admin station={sensorData} />;
};

export default AdminWrap;
