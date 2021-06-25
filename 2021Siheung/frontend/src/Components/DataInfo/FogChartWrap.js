import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

const FogChartWrap = ({ data }) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            minRotation: 80,
            maxRotation: 90,
          },
        },
      ],
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',

          rangeMin: {
            x: null,
            y: null,
          },
          rangeMax: {
            x: null,
            y: null,
          },
          speed: 1,
        },
        zoom: {
          enabled: true,
          mode: 'x',
          speed: 0.5,
        },
      },
    },
  };

  if (window.innerWidth > 400 && window.innerWidth <= 1200)
    return <Bar data={data} options={options} width={1000} height={650} />;
  else if (window.innerWidth <= 400)
    return <Bar data={data} options={options} width={400} height={600} />;
  else return <Bar data={data} options={options} />;
};

export default FogChartWrap;
