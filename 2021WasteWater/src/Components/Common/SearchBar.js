import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import useStationList from '../../lib/useStationList';
import { selectStatisticalData } from '../../lib/api/statistic';
import * as adminAPI from '../../lib/api/admin';
import { updateLoading, updateSelectedStation } from '../../modules/common';

import './scss/SearchBar.scss';
import {
  updateFluxData,
  updateFouloderData,
  updateTableData,
} from '../../modules/statistic';
import {
  updateNonData,
  updateNonTableData,
  updateWrongData,
  updateWrongTableData,
} from '../../modules/adminStatistic';
import { updateSelectedUserGroup } from '../../modules/admin';

const SearchBar = ({ setDoSearch, flag }) => {
  const dispatch = useDispatch();
  const stationList = useStationList();
  const selectedStation = useSelector((state) => state.common.selectedStation);
  const userGroup = useSelector((state) => state.admin.userGroup);
  const date = new Date();
  const [dataFlag, setDataFlag] = useState(
    flag === 'statistics' ? 'hour' : 'day'
  );
  const [startDate, setStartDate] = useState(moment(date).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment(date).format('YYYY-MM-DD'));
  const [defaultDate, setDefaultDate] = useState(
    moment(date).format('YYYY-MM-DD')
  );
  const years = () => {
    const today = new Date();
    const year = today.getFullYear();
    const years = [];

    for (let i = 2021; i < year + 1; i++) {
      years.push(i);
    }
    return years;
  };

  const handleStationChange = (e) => {
    const _selectedStation = e.target.value;
    dispatch(updateSelectedStation(_selectedStation));
  };

  const handleDataFlagChange = (e) => {
    const _flag = e.target.value;
    setDataFlag(_flag);
    if (_flag === 'hour' || _flag === 'day') {
      setStartDate(moment(date).format('YYYY-MM-DD'));
      setEndDate(moment(date).format('YYYY-MM-DD'));
      setDefaultDate(moment(date).format('YYYY-MM-DD'));
    } else if (_flag === 'month') {
      setStartDate(moment(date).format('YYYY-MM'));
      setEndDate(moment(date).format('YYYY-MM'));
      setDefaultDate(moment(date).format('YYYY-MM'));
    } else {
      setStartDate(moment(date).format('YYYY'));
      setEndDate(moment(date).format('YYYY'));
      setDefaultDate(moment(date).format('YYYY'));
    }
  };

  const handleStartDateChange = (e) => {
    const _startDate = e.target.value;
    setStartDate(_startDate);
  };

  const handleEndDateChange = (e) => {
    const _endDate = e.target.value;
    setEndDate(_endDate);
  };

  const handleUserGroupChange = (e) => {
    const _group = e.target.value;
    dispatch(updateSelectedUserGroup(_group));
  };

  const checkDate = () => {
    if (dataFlag === 'day') {
      if (
        moment.duration(moment(endDate).diff(moment(startDate))).asDays() > 31
      ) {
        alert('최대 일 검색일수는 31일입니다.');
      } else {
        handleSearch();
      }
    } else if (dataFlag === 'month') {
      if (
        moment.duration(moment(endDate).diff(moment(startDate))).asMonths() > 12
      ) {
        alert('최대 월 검색월수는 12개월 입니다.');
      } else {
        handleSearch();
      }
    } else {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setDoSearch(true);
    getStatisticalData();
  };

  const getStatisticalData = () => {
    const cancelToken = axios.CancelToken.source();

    const _stationId = selectedStation;
    const _flag = dataFlag;
    const _startDate = startDate;

    const _endDate =
      _flag === 'hour'
        ? moment(startDate).add(1, 'd').format('YYYY-MM-DD')
        : _flag === 'day'
        ? moment(endDate).add(1, 'd').format('YYYY-MM-DD')
        : _flag === 'month'
        ? moment(endDate).add(1, 'M').format('YYYY-MM')
        : moment(endDate).add(1, 'Y').format('YYYY');

    dispatch(updateLoading(true));

    if (flag === 'statistics') {
      selectStatisticalData(
        cancelToken.token,
        _stationId,
        _startDate,
        _endDate,
        _flag
      )
        .then((response) => {
          if (response.data.data) {
            const xaxis = [];
            const inSpeed = [];
            const outSpeed = [];
            const flux = [];
            const deposition = [];
            const waterLv = [];
            const quality = [];
            const nh3 = [];
            const h2s = [];
            const co = [];
            const tol = [];
            response.data.data.flux.forEach((data) => {
              if (dataFlag === 'hour') {
                xaxis.push(`${data.hour}시`);
              } else if (dataFlag === 'day') {
                xaxis.push(moment(data.date).format('M월 D일'));
              } else if (dataFlag === 'month') {
                xaxis.push(moment(data.date).format('M월'));
              } else {
                xaxis.push(`${data.year}년`);
              }
              inSpeed.push(data.innrSpfld);
              outSpeed.push(data.srfcSpfld);
              flux.push(data.flux);
              deposition.push(data.amnRt);
              waterLv.push(data.wal);
              quality.push(data.qltwtr);
            });

            response.data.data.bsml.forEach((data) => {
              nh3.push(data.nh3);
              h2s.push(data.h2s);
              co.push(data.co);
              tol.push(data.toluene);
            });

            dispatch(
              updateFluxData({
                xaxis: xaxis,
                inSpeed: inSpeed,
                outSpeed: outSpeed,
                deposition: deposition,
                flux: flux,
                quality: quality,
              })
            );
            dispatch(
              updateFouloderData({
                xaxis: xaxis,
                nh3: nh3,
                co: co,
                h2s: h2s,
                tol: tol,
              })
            );
            dispatch(updateTableData(response.data.data));
          }
          dispatch(updateLoading(false));
        })
        .catch((e) => {
          console.error('selectStatisticData error');
          console.log(e);
        });
    } else if (flag === 'adminData') {
      //테스트는 여주로 4/30일
      adminAPI
        .selectErrorData(_stationId, _startDate, _endDate, _flag)
        .then((response) => {
          const xaxis = [];
          const wrongFlux = [];
          const wrongFoulOder = [];
          const wrongQuality = [];
          const nonFlux = [];
          const nonFoulOder = [];
          const nonQuality = [];

          response.data.data.omitChart.forEach((data) => {
            if (dataFlag === 'day') {
              xaxis.push(moment(data.date).format('M월 D일'));
            } else if (dataFlag === 'month') {
              xaxis.push(moment(data.date).format('M월'));
            } else {
              xaxis.push(`${data.year}년`);
            }
            nonFlux.push(data.flux);
            nonFoulOder.push(data.bsml);
            nonQuality.push(data.qltwtr);
          });

          response.data.data.wrongChart.forEach((data) => {
            wrongFlux.push(data.flux);
            wrongFoulOder.push(data.bsml);
            wrongQuality.push(data.qltwtr);
          });

          response.data.data.wrongData.forEach((data) => {
            data.date = moment(data.date).format('YYYY년 MM월 DD일');
          });

          response.data.data.omitData.forEach((data) => {
            data.date = moment(data.date).format('YYYY년 MM월 DD일');
          });

          dispatch(
            updateWrongData({
              xaxis: xaxis,
              flux: wrongFlux,
              foulOder: wrongFoulOder,
              quality: wrongQuality,
            })
          );

          dispatch(
            updateNonData({
              xaxis: xaxis,
              flux: nonFlux,
              foulOder: nonFoulOder,
              quality: nonQuality,
            })
          );

          dispatch(updateWrongTableData(response.data.data.wrongData));
          dispatch(updateNonTableData(response.data.data.omitData));

          dispatch(updateLoading(false));
        })
        .catch((e) => {
          console.error('selectErrorData error');
          console.error(e);
        });
    }
  };

  if (!stationList) return null;
  return (
    <div className="searchBarWrap">
      <ul className="searchListGroup">
        {/* 페이지마다 보이는 li가 다릅니다.*/}
        <li className="searchList name">
          <span className="searchListName">측정소명</span>
          <select className="searchListSelect" onChange={handleStationChange}>
            {stationList &&
              stationList.map((station) => (
                <option key={station.obsrvtId} value={station.obsrvtId}>
                  {station.obsrvtNm}
                </option>
              ))}
          </select>
        </li>
        <li className="searchList data">
          <span className="searchListName">데이터 구분</span>
          <select
            className="searchListSelect"
            defaultValue={flag === 'statistics' ? 'hour' : 'day'}
            onChange={handleDataFlagChange}
          >
            {flag === 'statistics' && <option value="hour">시간</option>}
            <option value="day">일</option>
            <option value="month">월</option>
            <option value="year">년</option>
          </select>
        </li>
        <li className="searchList date">
          <span className="searchListName">조회기간</span>
          {dataFlag === 'year' ? (
            <select
              className="searchListSelect"
              onChange={handleStartDateChange}
            >
              {years().map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={dataFlag === 'month' ? 'month' : 'date'}
              value={startDate}
              max={endDate}
              onChange={handleStartDateChange}
              className="searchListSelect"
            />
          )}
          {dataFlag !== 'hour' && <span className="datespan">~</span>}
          {dataFlag === 'year' ? (
            <select className="searchListSelect" onChange={handleEndDateChange}>
              {years().map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          ) : (
            dataFlag !== 'hour' && (
              <input
                type={dataFlag === 'month' ? 'month' : 'date'}
                value={endDate}
                min={startDate}
                max={defaultDate}
                onChange={handleEndDateChange}
                className="searchListSelect"
              />
            )
          )}
        </li>
        <li className="searchList division">
          <span className="searchListName">구분</span>
          <select className="searchListSelect">
            <option>전체</option>
          </select>
        </li>
        <li className="searchList item">
          <span className="searchListName">항목</span>
          <select className="searchListSelect">
            <option>전체</option>
          </select>
        </li>
        {flag === 'user' && (
          <li className="searchList team">
            <span className="searchListName">소속</span>
            <select
              className="searchListSelect"
              onChange={handleUserGroupChange}
            >
              <option value="all">전체</option>
              {userGroup &&
                userGroup.map((group) => (
                  <option value={group.mngrCd} key={group.mngrCd}>
                    {group.cdDc}
                  </option>
                ))}
            </select>
          </li>
        )}
        {(flag === 'statistics' || flag === 'adminData') && (
          <button className="searchBtn" onClick={checkDate}>
            <svg className="searchIcon" viewBox="0 0 15.977 15.98">
              <path
                d="M15.76,13.815,12.648,10.7a.748.748,0,0,0-.531-.218h-.509a6.488,6.488,0,1,0-1.123,1.123v.509a.748.748,0,0,0,.218.531l3.111,3.111a.746.746,0,0,0,1.058,0l.883-.883A.752.752,0,0,0,15.76,13.815Zm-9.269-3.33a3.995,3.995,0,1,1,3.995-3.995A3.992,3.992,0,0,1,6.491,10.486Z"
                fill="#fff"
              />
            </svg>
            <span>검색</span>
          </button>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
