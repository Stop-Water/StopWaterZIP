import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import './CSS/Table.css';

const ObservedChartWrap = ({ data, option }) => {
  let options;
  if (option === 'humid') {
    options = {
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
  } else {
    options = {
      scales: {
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
  }
  //태블릿 환경에서 테스트 필요
  if (window.innerWidth > 600)
    return <Line data={data} options={options} width={1000} height={650} />;
  else return <Line data={data} options={options} width={1000} height={1200} />;
};

export default ObservedChartWrap;
