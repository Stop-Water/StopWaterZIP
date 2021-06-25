import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartWrap = ({ data }) => {
  let labels = [];
  let grData = [];
  data.forEach((element) => {
    labels = [
      ...labels,
      `${element.obs_time.substring(0, 2)}시 ${element.obs_time.substring(
        2,
        4
      )}분`,
    ];
    grData = [...grData, `${element.visibility}`];
  });
  const graphData = {
    labels: [...labels.reverse()],
    datasets: [
      {
        label: '시정 거리(m)',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [...grData.reverse()],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  };
  return (
    <div className="GraphWrap">
      <Line data={graphData} options={options} width={1000} height={600} />
    </div>
  );
};

export default ChartWrap;
