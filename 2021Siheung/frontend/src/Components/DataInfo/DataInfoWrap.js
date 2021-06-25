import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataInfo from './DataInfo';
import './CSS/DataInfoWrap.css';

const DataInfoWrap = () => {
  const [stationList, setStationList] = useState();

  useEffect(() => {
    const cancleToken = axios.CancelToken.source();

    const getStationList = async () => {
      const URL = '/api/stationinfo';

      await axios
        .get(URL, {
          cancelToken: cancleToken.token,
        })
        .then((response) => {
          setStationList(modifyData(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getStationList();

    return () => {
      cancleToken.cancel();
    };
  }, []);

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

  if (!stationList) {
    return null;
  }
  return (
    <div className="subContWrap">
      <DataInfo data={stationList} />
    </div>
  );
};

export default DataInfoWrap;
