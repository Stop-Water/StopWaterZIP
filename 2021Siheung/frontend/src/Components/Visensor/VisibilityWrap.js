import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import ChartWrap from './ChartWrap';
import './CSS/VisibilityWrap.css';

const VisibilityWrap = () => {
  const [data, setData] = useState(null);
  const [grData, setGrData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api_vi/sensorData');
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    const fetchGrData = async () => {
      try {
        const response = await axios.get('/api_vi/sensorData');
        setGrData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchGrData();
  }, []);

  if (!data || !grData) {
    return null;
  }
  return (
    <div className="visivilityWrap">
      <Table data={data}></Table>
      <ChartWrap data={grData} className="GraphWrap" />
    </div>
  );
};

export default VisibilityWrap;
