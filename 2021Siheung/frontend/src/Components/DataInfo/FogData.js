import React, { useState } from 'react';
import moment from 'moment';
import Loading from '../../Pages/Loading';
import BlueBtn from '../Common/BuleButtons';
import axios from 'axios';
import MultiSelect from 'react-multi-select-component';
import FogChartWrap from './FogChartWrap';

const BlueButton = BlueBtn.default;

const getYearList = () => {
  const today = new Date();
  const year = today.getFullYear();
  const years = [];

  for (let i = 2020; i <= year + 1; i++) {
    years.push(i);
  }

  return years;
};

const FogData = ({ options, overrideStrings }) => {
  const yesterday = new Date();
  const today = new Date();
  const years = getYearList();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  const todayStr = today.toISOString().slice(0, 10);

  const [selectedLocation, setSelectedLocation] = useState(),
    [startDate, setStartDate] = useState(yesterdayStr),
    [endDate, setEndDate] = useState(yesterdayStr),
    [isLoading, setIsLoading] = useState(false),
    [defaultDate, setDefaultDate] = useState(yesterdayStr),
    [selectedTime, setSelectedTime] = useState('day'),
    [data, setData] = useState();

  /*const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };*/

  const handleTimeChange = (e) => {
    let monthStr = '';
    if (e.target.value === 'day') {
      monthStr = moment(yesterdayStr).format('YYYY-MM-DD');
    } else if (e.target.value === 'month') {
      monthStr = moment(todayStr).format('YYYY-MM');
    } else {
      monthStr = years[0].toString();
    }
    setStartDate(monthStr);
    setEndDate(monthStr);
    setDefaultDate(monthStr);
    setSelectedTime(e.target.value);
  };

  const handleStartDate = (e) => {
    const startDate = e.target.value;
    setStartDate(startDate);
  };

  const handleEndDate = (e) => {
    const endDate = e.target.value;
    setEndDate(endDate);
  };

  const handleSearch = () => {
    if (selectedLocation !== undefined && selectedLocation.length !== 0) {
      if (selectedTime === 'year' && startDate > endDate) {
        alert('조회년도를 올바르게 선택해주세요.');
      } else {
        const stationList = [];
        selectedLocation.forEach((element) => {
          stationList.push(element.value);
        });
        const reqBody = {
          foginfo: {
            stationList: stationList,
            dataDiv: selectedTime,
            from: startDate.replace(/-/g, ''),
            to: endDate.replace(/-/g, ''),
          },
        };

        const jsonReq = JSON.stringify(reqBody);
        getData(jsonReq);
      }
    } else {
      alert('조회할 관측소를 선택해 주세요');
    }
  };

  const getLabel = (data) => {
    const result = [];
    data.forEach((data) => {
      options.forEach((station) => {
        if (data.station_id === station.value) result.push(station.label);
      });
    });
    /*if (selectedTime === 'day') {
      data.forEach((element) => {
        result.push(
          `${element.calc_time.substring(0, 4)}년 ${element.calc_time.substring(
            4,
            6,
          )}월 ${element.calc_time.substring(6, 8)}일`,
        );
      });
    } else if (selectedTime === 'month') {
      data.forEach((element) => {
        result.push(
          `${element.calc_time.substring(0, 4)}년 ${element.calc_time.substring(
            4,
            6,
          )}월`,
        );
      });
    } else {
      data.forEach((element) => {
        result.push(`${element.calc_time}년`);
      });
    }*/

    return result;
  };

  const getLessData = (data) => {
    const result = [];
    data.forEach((element) => {
      result.push(element.light);
    });
    return result;
  };

  const getMoreData = (data) => {
    const result = [];
    data.forEach((element) => {
      result.push(element.deep);
    });
    return result;
  };

  const modifyGraphData = (data) => {
    const label = getLabel(data);
    const lessData = getLessData(data);
    const moreData = getMoreData(data);

    const graphData = {
      labels: label,
      datasets: [
        {
          label: '옅은 안개',
          backgroundColor: 'rgba(153,214,255,0.2)',
          borderColor: 'rgba(153,214,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(153,214,255,0.4)',
          hoverBorderColor: 'rgba(153,214,255,1)',
          barThickness: 'flex',
          data: lessData,
        },
        {
          label: '짙은 안개',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          barThickness: 'flex',
          data: moreData,
        },
      ],
    };

    setData(graphData);
  };

  const getData = async (reqBody) => {
    setIsLoading(true);
    const URL = '/api/statisticfogdetect';

    await axios
      .post(URL, reqBody, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        modifyGraphData(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('getFogData Error');
        console.log(e);
      });
  };

  return (
    <div className="subContBox">
      {isLoading ? <Loading /> : <></>}
      <div className="row searchBox">
        <div className="selectArea pointArea fog col-md-12 col-xl-4">
          <h2 className="selectTit">· 관측소명</h2>
          {/* <select onChange={handleLocationChange}>
            <option value="" className="colorCCC">
              관측소 선택
            </option>
            {options.map((location) => (
              <option value={location.value} key={location.value}>
                {location.label}
              </option>
            ))}
          </select>*/}
          <MultiSelect
            options={options}
            value={selectedLocation}
            onChange={setSelectedLocation}
            labelledBy={'Select'}
            disableSearch={true}
            overrideStrings={overrideStrings}
            hasSelectAll={true}
          />
        </div>
        <div className="selectArea dataSelect col-md-12 col-xl-2">
          <h2 className="selectTit">· 데이터구분</h2>
          {/* <CustomSelect data={dataFlag} setData={setDataFlag} /> */}
          <select onChange={handleTimeChange}>
            <option value="day"> 일</option>
            <option value="month"> 월</option>
            <option value="year"> 년</option>
          </select>
        </div>
        <div className="selectArea col-md-12 col-xl-4">
          <h2 className="selectTit">· 조회</h2>
          <div className="dispFlex">
            {selectedTime === 'day' ? (
              <>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDate}
                  min="2020-09-01"
                  max={endDate}
                />
                <span className="pl-3 pr-3">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDate}
                  min={startDate}
                  max={defaultDate}
                />
              </>
            ) : selectedTime === 'month' ? (
              <>
                <input
                  type="month"
                  value={startDate}
                  onChange={handleStartDate}
                  min="2020-09"
                  max={endDate}
                />
                <span className="pl-3 pr-3">~</span>
                <input
                  type="month"
                  value={endDate}
                  onChange={handleEndDate}
                  min={startDate}
                  max={defaultDate}
                />
              </>
            ) : (
                  <>
                    <select onChange={handleStartDate}>
                      {years.map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span className="pl-3 pr-3">~</span>
                    <select onChange={handleEndDate}>
                      {years.map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </>
                )}
          </div>
        </div>

        <div className="selectArea searchArea col-md-12 col-xl-2">
          <BlueButton
            variant="contained"
            className="largeBtn"
            onClick={handleSearch}
          >
            검색
          </BlueButton>
        </div>
      </div>
      {/*searchBox*/}

      {data ? (
        <div className="fogDataContWrap">
          {/*<h2 className="ChartTit">
            · 해양경찰서 <span className="dataDetailTit">봄</span>
      </h2>*/}
          <div className="ChartCont">
            <FogChartWrap data={data} />
          </div>
        </div>
      ) : (
          <div className="searchInfoBox"></div>
        )}
    </div>
  );
};

export default FogData;
