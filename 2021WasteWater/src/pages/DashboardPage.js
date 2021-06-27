import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import SelectTop from '../Components/Common/SelectTop';
import DashboardSection from '../Components/Dashboard/DashboardSection';
import '../Components/Dashboard/scss/DashboardPage.scss';
import useWsData from '../lib/useWsData';

import {
  insertFluxRTData,
  insertFluxTBData,
  insertFoulOderRTData,
  insertFoulOderTBData,
  insertQualityRTData,
  insertQualityTBData,
  removeFluxRTData,
  removeFluxTBData,
  removeFoulOderRTData,
  removeFoulOderTBData,
  removeQualityRTData,
  removeQualityTBData,
  resetDashBoardData,
} from '../modules/dashBoard';

const DashboardPage = () => {
  const wsData = useWsData();
  const xaxisLength = useRef(0);
  const dispatch = useDispatch();
  const SECTION_INFO = [
    {
      id: 'flux',
      name: '유량',
      data: null,
      cardItem: [
        {
          name: '유량',
          id: 'flux',
          unit: (
            <span>
              m<sup>3</sup>/s
            </span>
          ),
        },
        { name: '수위', id: 'waterlv', unit: 'cm' },
        { name: '표면 유속', id: 'outSpeed', unit: 'm/s' },
        { name: '내부 유속', id: 'inSpeed', unit: 'm/s' },
        {
          name: (
            <div>
              퇴적물<br></br>LEVEL
            </div>
          ),
          id: 'deposition',
          unit: '%',
        },
      ],
    },
    {
      id: 'foulOder',
      name: '악취',
      data: null,
      cardItem: [
        {
          name: (
            <span>
              NH<sub>3</sub>
            </span>
          ),
          id: 'nh3',
          unit: 'ppm',
        },
        { name: 'CO', id: 'co', unit: 'ppm' },
        {
          name: (
            <span>
              H<sub>2</sub>S
            </span>
          ),
          id: 'h2s',
          unit: 'ppm',
        },
        { name: 'Toluene', id: 'tol', unit: 'ppm' },
      ],
    },
    {
      id: 'quality',
      name: '수질',
      data: null,
      cardItem: [{ name: '수질', id: 'quality', unit: 'mg/l' }],
    },
  ];

  if (wsData) {
    const fluxData = SECTION_INFO.filter((element) => element.id === 'flux')[0];
    const qualityData = SECTION_INFO.filter(
      (element) => element.id === 'quality'
    )[0];
    const foulOderData = SECTION_INFO.filter(
      (element) => element.id === 'foulOder'
    )[0];

    fluxData.data = wsData.flux;
    fluxData.data = wsData.flux;
    qualityData.data = wsData.quality;
    foulOderData.data = wsData.foulOder;
  }

  useEffect(() => {
    if (wsData) {
      if (xaxisLength.current >= 10) {
        dispatch(removeFluxRTData());
        dispatch(removeFoulOderRTData());
        dispatch(removeQualityRTData());
        dispatch(removeFluxTBData());
        dispatch(removeFoulOderTBData());
        dispatch(removeQualityTBData());
      } else {
        xaxisLength.current += 1;
      }

      dispatch(
        insertFluxRTData({
          xaxis: wsData.flux.date,
          inSpeed: wsData.flux.inSpeed,
          outSpeed: wsData.flux.outSpeed,
          deposition: wsData.flux.deposition,
          flux: wsData.flux.flux,
          waterLv: wsData.flux.waterlv,
        })
      );

      dispatch(
        insertQualityRTData({
          xaxis: wsData.quality.date,
          quality: wsData.quality.quality,
        })
      );

      dispatch(
        insertFoulOderRTData({
          xaxis: wsData.foulOder.date,
          nh3: wsData.foulOder.nh3,
          co: wsData.foulOder.co,
          h2s: wsData.foulOder.h2s,
          tol: wsData.foulOder.tol,
        })
      );

      dispatch(insertFluxTBData(wsData.flux));
      dispatch(insertQualityTBData(wsData.quality));
      dispatch(insertFoulOderTBData(wsData.foulOder));
    }
  }, [dispatch, wsData]);

  useEffect(() => {
    return () => {
      xaxisLength.current = 0;
      dispatch(resetDashBoardData());
    };
  }, [dispatch]);

  if (!wsData) return null;
  return (
    <div className="dashboardPage">
      <SelectTop />
      <div className="dashboardWrap">
        {SECTION_INFO.map((info, index) => (
          <DashboardSection
            name={info.name}
            flag={info.id}
            key={index}
            data={info.data}
            index={index + 1}
            cardItem={info.cardItem}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
