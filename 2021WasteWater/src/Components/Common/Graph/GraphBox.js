import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';
import useDarkMode from 'use-dark-mode';
import '../scss/GraphBox.scss';
import '../scss/BoxFrame.scss';

const GraphBox = ({ data, flag }) => {
  const graph = useRef();
  const graphWrap = useRef();
  const darkmode = useDarkMode();

  useEffect(() => {
    let _data;
    if (flag === 'flux') {
      _data = [
        {
          x: data.xaxis,
          y: data.inSpeed,
          name: '내부유속',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.outSpeed,
          name: '외부유속',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.deposition,
          name: '퇴적율',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.flux,
          name: '유량',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.quality,
          name: '수질',
          type: 'bar',
        },
      ];
    } else if (flag === 'fluxRT') {
      _data = [
        {
          x: data.xaxis,
          y: data.inSpeed,
          name: '내부유속',
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.outSpeed,
          name: '외부유속',
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.deposition,
          name: '퇴적율',
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.flux,
          name: '유량',
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.waterLv,
          name: '수위',
          mode: 'lines',
        },
      ];
    } else if (flag === 'qualityRT') {
      _data = [
        {
          x: data.xaxis,
          y: data.quality,
          name: '수질',
          mode: 'lines',
        },
      ];
    } else if (flag === 'foulOderRT') {
      _data = [
        {
          x: data.xaxis,
          y: data.nh3,
          name: `NH${'3'.sub()}`,
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.co,
          name: 'CO',
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.h2s,
          name: `H${'2'.sub()}S`,
          mode: 'lines',
        },
        {
          x: data.xaxis,
          y: data.tol,
          name: 'Toluene',
          mode: 'lines',
        },
      ];
    } else if (flag === 'foulOder') {
      _data = [
        {
          x: data.xaxis,
          y: data.nh3,
          name: `NH${'3'.sub()}`,
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.co,
          name: 'CO',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.h2s,
          name: `H${'2'.sub()}S`,
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.tol,
          name: 'Toluene',
          type: 'bar',
        },
      ];
    } else {
      _data = [
        {
          x: data.xaxis,
          y: data.flux,
          name: '유량',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.quality,
          name: '수질',
          type: 'bar',
        },
        {
          x: data.xaxis,
          y: data.foulOder,
          name: '악취',
          type: 'bar',
        },
      ];
    }

    const handleResize = () => {
      const wrapHight = graphWrap.current && graphWrap.current.offsetHeight;
      const wrapWidth = graphWrap.current && graphWrap.current.offsetWidth;
      Plotly.newPlot(
        graphWrap.current,
        _data,
        {
          autosize: true,
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          xaxis: {
            color: darkmode.value
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(0, 0, 0, 1)',
            tickcolor: 'rgba(255,255,255,0)',
            linecolor: 'rgba(255,255,255, 0.1)',
            gridcolor: 'rgba(255,255,255, 0)',
            zeroline: false,
          },
          yaxis: {
            color: darkmode.value
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(0, 0, 0, 1)',
            tickcolor: 'rgba(0, 0, 0, 0)',
            linecolor: 'rgba(255,255,255, 0)',
            gridcolor: 'rgba(255,255,255, 0)',
            zeroline: false,
          },
          barmode: 'group',
          legend: {
            x: 0,
            y: 2,
            orientation: 'h',
            font: {
              color: darkmode.value
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(0, 0, 0, 1)',
            },
          },
          height: wrapHight,
          width: wrapWidth,
          modebar: {
            orientation: 'v',
            bgcolor: 'rgba(0,0,0,0)',
            color: darkmode.value
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(0, 0, 0, 0.3)',
            activecolor: darkmode.value
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(0, 0, 0, 1)',
          },
          colorway: [
            'rgb(242,184,0)',
            'rgb(5,108,226)',
            'rgb(66,177,250)',
            'rgb(76,204,182)',
            'rgb(179,74,223)',
            'rgb(223,74,135)',
          ],
        },
        {
          displayModeBar: true,
          displaylogo: false,
        }
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, flag, darkmode.value]);

  if (!data) return null;
  return (
    <div className="graphBoxWrap boxFrame" ref={graphWrap}>
      <div className="frameLine"></div>
      <div className="graphBoxContainer">
        {/* graphSelect은 통계페이지에서만 보입니다.
                <div className="graphSelect">
                    <select className="selectBtn">
                        <option>전체항목</option>
                    </select>
                </div>*/}
        <div className="graphContainer" ref={graph}>
          {/* 그래프가 들어갑니다. */}
        </div>
      </div>
    </div>
  );
};

export default GraphBox;
