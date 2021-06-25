import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import BlueBtn from '../Common/BuleButtons';
import { useSelector } from 'react-redux';
import Loading from '../../Pages/Loading';
import MultiSelect from 'react-multi-select-component';
import { Table as VTable, Column, AutoSizer } from 'react-virtualized';
import ObservedChartWrap from './ObservedChartWrap';
import exportCSV from './exportCSV';

const BlueButton = BlueBtn.default;
const BlueButtonSM = BlueBtn.small;

function ObservedData({ options, overrideStrings }) {
  const yesterday = new Date();
  const today = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  const todayStr = today.toISOString().slice(0, 10);
  let stationList = [];
  let graphColor = [];

  const [selectedLocation, setSelectedLocation] = useState(),
    [flag, setFlag] = useState('hour'),
    [startDate, setStartDate] = useState(todayStr),
    [endDate, setEndDate] = useState(todayStr),
    [isLoading, setIsLoading] = useState(false),
    [defaultDate, setDefaultDate] = useState(todayStr),
    [dataLoaded, setDataLoaded] = useState(false),
    [tempData, setTempData] = useState(),
    [humidData, setHumidData] = useState(),
    [pm25Data, setPm25Data] = useState(),
    [tableData, setTableData] = useState();

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const getObserveData = async (reqBody) => {
    const URL = '/api/observeinfo';
    await axios
      .post(URL, reqBody, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        setTableData(modifyData(response.data, flag));
        setHumidData(modifyGraphData(response.data, flag, 'humid'));
        setTempData(modifyGraphData(response.data, flag, 'temp'));
        setPm25Data(modifyGraphData(response.data, flag, 'pm25'));
        setDataLoaded(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLabel = (flag) => {
    const result = [];

    const dateMove = new Date(startDate);
    const enDate = new Date(endDate);

    if (flag === 'hour') {
      const timezoneOffset = new Date().getTimezoneOffset() * 60000;
      const timezonedToday = new Date(Date.now() - timezoneOffset);
      const today = new Date();
      if (
        moment(today).format('YYYYMMDD') === moment(enDate).format('YYYYMMDD')
      ) {
        while (dateMove < timezonedToday) {
          const strDate = dateMove.toISOString().slice(0, 16);
          const modifiedDatte = moment(strDate).format('YYYYMMDDHH');
          result.push(modifiedDatte);
          dateMove.setHours(dateMove.getHours() + 1);
        }
      } else {
        enDate.setDate(enDate.getDate() + 1);
        while (dateMove < enDate) {
          const strDate = dateMove.toISOString().slice(0, 16);
          const modifiedDatte = moment(strDate).format('YYYYMMDDHH');
          result.push(modifiedDatte);
          dateMove.setHours(dateMove.getHours() + 1);
        }
      }
    } else if (flag === 'day') {
      while (dateMove <= enDate) {
        const strDate = dateMove.toISOString().slice(0, 10);
        const modifiedDatte = moment(strDate).format('YYYYMMDD');
        result.push(modifiedDatte);
        dateMove.setDate(dateMove.getDate() + 1);
      }
    } else {
      while (dateMove <= enDate) {
        const strDate = dateMove.toISOString().slice(0, 10);
        const modifiedDatte = moment(strDate).format('YYYYMM');
        result.push(modifiedDatte);
        dateMove.setMonth(dateMove.getMonth() + 1);
      }
    }
    return result;
  };

  const getGraphColor = () => {
    graphColor = [];
    selectedLocation.forEach(() => {
      const random1 = Math.random();
      const random2 = Math.random();
      const random3 = Math.random();
      const color = `rgba(${Math.floor(random1 * 255 + 1)}, ${Math.floor(
        random2 * 255 + 1,
      )}, ${Math.floor(random3 * 255 + 1)})`;

      graphColor.push(color);
    });
  };

  const modifyData = (data, flag) => {
    const modifiedData = [];
    let label = getLabel(flag);
    let result = [];
    switch (flag) {
      case 'hour':
        data.forEach((element) => {
          let day_type = null;
          if (element.day_type === 'D') {
            day_type = '짙은 안개';
          } else if (element.day_type === 'L') {
            day_type = '옅은 안개';
          } else {
            day_type = '안개 없음';
          }
          const temp = {
            station_nm: element.station_nm,
            time_div: `${element.obs_date}${element.time_div}`,
            avg_temperature: element.avg_temperature.toFixed(2),
            avg_humid: element.avg_humid.toFixed(2),
            avg_pm25: element.avg_pm25.toFixed(2),
            day_type: day_type,
          };
          modifiedData.push(temp);
        });
        selectedLocation.forEach((station) => {
          const locationTemp = modifiedData.filter((data) => {
            return station.label === data.station_nm;
          });
          label.forEach((date) => {
            const temp = locationTemp.find((data) => data.time_div === date);
            if (temp) {
              temp.time_div = `${date.substring(0, 4)}년 ${date.substring(
                4,
                6,
              )}월 ${date.substring(6, 8)}일 ${date.substring(8, 10)}시`;
              result.push(temp);
            } else {
              const temp = {
                station_nm: station.label,
                time_div: `${date.substring(0, 4)}년 ${date.substring(
                  4,
                  6,
                )}월 ${date.substring(6, 8)}일 ${date.substring(8, 10)}시`,
                avg_temperature: '-',
                avg_humid: '-',
                avg_pm25: '-',
              };
              result.push(temp);
            }
          });
        });
        break;
      case 'day':
        data.forEach((element) => {
          let day_type = null;
          if (element.day_type === 'D') {
            day_type = '짙은 안개';
          } else if (element.day_type === 'L') {
            day_type = '옅은 안개';
          } else {
            day_type = '안개 없음';
          }
          const temp = {
            station_nm: element.station_nm,
            time_div: element.obs_date,
            avg_temperature: element.avg_temperature.toFixed(2),
            avg_humid: element.avg_humid.toFixed(2),
            avg_pm25: element.avg_pm25.toFixed(2),
            day_type: day_type,
          };
          modifiedData.push(temp);
        });
        selectedLocation.forEach((station) => {
          const locationTemp = modifiedData.filter((data) => {
            return station.label === data.station_nm;
          });
          label.forEach((date) => {
            const temp = locationTemp.find((data) => data.time_div === date);
            if (temp) {
              temp.time_div = `${date.substring(0, 4)}년 ${date.substring(
                4,
                6,
              )}월 ${date.substring(6, 8)}일`;
              delete temp.obs_date;
              result.push(temp);
            } else {
              const temp = {
                station_nm: station.label,
                time_div: `${date.substring(0, 4)}년 ${date.substring(
                  4,
                  6,
                )}월 ${date.substring(6, 8)}일`,
                avg_temperature: '-',
                avg_humid: '-',
                avg_pm25: '-',
              };
              result.push(temp);
            }
          });
        });
        break;
      default:
        data.forEach((element) => {
          const temp = {
            station_nm: element.station_nm,
            time_div: element.month_div,
            avg_temperature: element.avg_temperature.toFixed(2),
            avg_humid: element.avg_humid.toFixed(2),
            avg_pm25: element.avg_pm25.toFixed(2),
          };
          modifiedData.push(temp);
        });
        selectedLocation.forEach((station) => {
          const locationTemp = modifiedData.filter((data) => {
            return station.label === data.station_nm;
          });
          label.forEach((date) => {
            const temp = locationTemp.find((data) => data.time_div === date);
            if (temp) {
              temp.time_div = `${date.substring(0, 4)}년 ${date.substring(
                4,
                6,
              )}월`;
              delete temp.month_div;
              result.push(temp);
            } else {
              const temp = {
                station_nm: station.label,
                time_div: `${date.substring(0, 4)}년 ${date.substring(4, 6)}월`,
                avg_temperature: '-',
                avg_humid: '-',
                avg_pm25: '-',
              };
              result.push(temp);
            }
          });
        });
        break;
    }
    return result;
  };

  const handleClick = () => {
    if (selectedLocation !== undefined && selectedLocation.length !== 0) {
      selectedLocation.forEach((element) => {
        stationList.push(element.value);
      });
      setIsLoading(true);
      setDataLoaded(false);

      const reqBody = {
        observeinfo: {
          stationList: stationList,
          dataDiv: flag,
          startDate: startDate.split('-').join(''),
          endDate: endDate.split('-').join(''),
        },
      };
      const jsonReq = JSON.stringify(reqBody);
      getGraphColor();
      getObserveData(jsonReq);
    } else {
      alert('관측소를 선택하세요');
    }
  };

  const handleFlagChange = (e) => {
    setDataLoaded(false);
    setFlag(e.target.value);
    if (e.target.value === 'hour') {
      setStartDate(todayStr);
      setEndDate(todayStr);
      setDefaultDate(todayStr);
    } else if (e.target.value === 'month') {
      const monthStr = moment(todayStr).format('YYYY-MM');
      setStartDate(monthStr);
      setEndDate(monthStr);
      setDefaultDate(monthStr);
    } else {
      setStartDate(yesterdayStr);
      setEndDate(yesterdayStr);
      setDefaultDate(yesterdayStr);
    }
  };

  const handleStartDate = (e) => {
    const startDate = e.target.value;
    setStartDate(startDate);
  };

  const handleEndDate = (e) => {
    const endDate = e.target.value;
    setEndDate(endDate);
  };

  /*const modifyTableData = (data, flag) => {
    let resultData = [];
    switch (flag) {
      case 'hour':
        data.forEach((element) => {
          resultData = [
            ...resultData,
            {
              station_nm: element.station_nm,
              time_div: `${element.obs_date.substring(
                0,
                4,
              )}년 ${element.obs_date.substring(
                4,
                6,
              )}월 ${element.obs_date.substring(6, 8)}일 ${element.time_div}시`,
              avg_temperature: element.avg_temperature.toFixed(2),
              avg_humid: element.avg_humid.toFixed(2),
              avg_pm25: element.avg_pm25.toFixed(2),
            },
          ];
        });
        break;
      case 'day':
        data.forEach((element) => {
          resultData = [
            ...resultData,
            {
              station_nm: element.station_nm,
              time_div: `${element.obs_date.substring(
                0,
                4,
              )}년 ${element.obs_date.substring(
                4,
                6,
              )}월 ${element.obs_date.substring(6, 8)}일`,
              avg_temperature: element.avg_temperature.toFixed(2),
              avg_humid: element.avg_humid.toFixed(2),
              avg_pm25: element.avg_pm25.toFixed(2),
            },
          ];
        });
        break;
      case 'month':
        data.forEach((element) => {
          resultData = [
            ...resultData,
            {
              station_nm: element.station_nm,
              time_div: `${element.month_div.substring(
                0,
                4,
              )}년 ${element.month_div.substring(4, 6)}월`,
              avg_temperature: element.avg_temperature.toFixed(2),
              avg_humid: element.avg_humid.toFixed(2),
              avg_pm25: element.avg_pm25.toFixed(2),
            },
          ];
        });
        break;
      default:
        break;
    }
    setTableData(resultData);
  };*/

  const modifyGraphData = (responseData, flag, dataFlag) => {
    let result = [];
    let filteredData = [];
    let filteredLabel = [];

    const modifiedData = modifyData(responseData, flag);

    selectedLocation.forEach((element, index) => {
      const avg_humid = [];
      const avg_temp = [];
      const avg_pm25 = [];
      let selectedData = [];
      let dataList = modifiedData.filter(
        (data) => data.station_nm === element.label,
      );

      dataList.forEach((element) => {
        avg_temp.push(element.avg_temperature);
        avg_humid.push(element.avg_humid);
        avg_pm25.push(element.avg_pm25);
      });

      if (index === 0) {
        dataList.forEach((element) => {
          filteredLabel.push(element.time_div);
        });
      }

      switch (dataFlag) {
        case 'humid':
          selectedData = avg_humid;
          break;
        case 'temp':
          selectedData = avg_temp;
          break;
        case 'pm25':
          selectedData = avg_pm25;
          break;
        default:
          break;
      }

      filteredData = [
        ...filteredData,
        {
          label: element.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `rgba(75,192,192,0.4)`,
          borderColor: `${graphColor[index]}`,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: `${graphColor[index]}`,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: `${graphColor[index]}`,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: [...selectedData],
        },
      ];
    });
    result = {
      labels: [...filteredLabel],
      datasets: [...filteredData],
    };

    return result;
  };

  /*const modifyGraphData = (responseData, flag, dataFlag) => {
    let result = [];
    let filteredData = [];
    let filteredLabel = [];
    selectedLocation.forEach((element, index) => {
      const avg_humid = [];
      const avg_temp = [];
      const avg_pm25 = [];
      let selectedData = [];
      const random1 = Math.random();
      const random2 = Math.random();
      const random3 = Math.random();
      let dataList = responseData.filter(
        (data) => data.station_nm === element.label,
      );
      dataList.forEach((element) => {
        avg_temp.push(element.avg_temperature.toFixed(2));
        avg_humid.push(element.avg_humid.toFixed(2));
        avg_pm25.push(element.avg_pm25.toFixed(2));
      });

      if (index === 0) {
        switch (flag) {
          case 'hour':
            dataList.forEach((element) => {
              filteredLabel.push(
                `${element.obs_date.substring(
                  0,
                  4,
                )}년 ${element.obs_date.substring(
                  4,
                  6,
                )}월 ${element.obs_date.substring(6, 8)}일 ${
                  element.time_div
                }시`,
              );
            });
            break;
          case 'day':
            dataList.forEach((element) => {
              filteredLabel.push(
                `${element.obs_date.substring(
                  0,
                  4,
                )}년 ${element.obs_date.substring(
                  4,
                  6,
                )}월 ${element.obs_date.substring(6, 8)}일`,
              );
            });
            break;
          case 'month':
            dataList.forEach((element) => {
              filteredLabel.push(
                `${element.month_div.substring(
                  0,
                  4,
                )}년 ${element.month_div.substring(4, 6)}월`,
              );
            });
            break;
          default:
            break;
        }
      }

      switch (dataFlag) {
        case 'humid':
          selectedData = avg_humid;
          break;
        case 'temp':
          selectedData = avg_temp;
          break;
        case 'pm25':
          selectedData = avg_pm25;
          break;
        default:
          break;
      }

      filteredData = [
        ...filteredData,
        {
          label: element.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `rgba(75,192,192,0.4)`,
          borderColor: `rgba(${Math.floor(random1 * 255 + 1)},${Math.floor(
            random2 * 255 + 1,
          )},${Math.floor(random3 * 255 + 1)},0.5)`,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: `rgba(${Math.floor(random1 * 255 + 1)},${Math.floor(
            random2 * 255 + 1,
          )},${Math.floor(random3 * 255 + 1)},0.5)`,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: `rgba(${Math.floor(
            random1 * 255 + 1,
          )},${Math.floor(random2 * 255 + 1)},${Math.floor(
            random3 * 255 + 1,
          )},0.5)`,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: [...selectedData],
        },
      ];
    });

    result = {
      labels: [...filteredLabel],
      datasets: [...filteredData],
    };

    return result;
  };*/

  return (
    <div className="subContBox">
      {isLoading ? <Loading /> : <></>}
      <div className="row searchBox">
        <div className="selectArea pointArea col-md-12 col-xl-4">
          <h2 className="selectTit">· 관측소명</h2>
          <MultiSelect
            options={options}
            value={selectedLocation}
            onChange={setSelectedLocation}
            labelledBy={'Select'}
            disableSearch={true}
            overrideStrings={overrideStrings}
          />
        </div>
        <div className="selectArea dataSelect col-md-12 col-xl-1">
          <h2 className="selectTit">· 데이터구분</h2>

          <select onChange={handleFlagChange} defaultValue="hour">
            <option value="hour"> 시간</option>
            <option value="day"> 일</option>
            <option value="month"> 월</option>
          </select>
        </div>
        <div className="selectArea dateSelect col-md-12 col-xl-4">
          <h2 className="selectTit">· 조회기간</h2>
          {flag === 'month' ? (
            <div className="dispFlex">
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
            </div>
          ) : (
            <div className="dispFlex">
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
            </div>
          )}
        </div>
        <div className="selectArea searchArea col-md-12 col-xl-2">
          <BlueButton
            variant="contained"
            className="largeBtn"
            onClick={handleClick}
          >
            검색
          </BlueButton>
        </div>
      </div>
      {!dataLoaded ? (
        <div className="searchInfoBox"></div>
      ) : tableData ? (
        <div className="row">
          <div className="leftChartWrap">
            <h2 className="ChartTit">온도(℃)</h2>
            <div className="ChartCont">
              <ObservedChartWrap data={tempData} />
            </div>

            <h2 className="ChartTit">습도(%)</h2>
            <div className="ChartCont">
              <ObservedChartWrap data={humidData} option={'humid'} />
            </div>

            <h2 className="ChartTit">초미세먼지(μg/㎥)</h2>
            <div className="ChartCont">
              <ObservedChartWrap data={pm25Data} />
            </div>
          </div>

          <div className="rightTableWrap">
            <h2 className="ChartTit TitBtn">
              조회 테이블
              {user ? (
                <BlueButtonSM
                  className="ChartTitDownBtn"
                  onClick={() => {
                    exportCSV(tableData);
                  }}
                >
                  다운로드
                </BlueButtonSM>
              ) : (
                <></>
              )}
            </h2>
            {flag === 'month' ? (
              <div className="dataTable">
                <AutoSizer>
                  {({ width }) => (
                    <VTable
                      rowClassName="table-row"
                      headerHeight={55}
                      width={width}
                      height={1000}
                      rowHeight={60}
                      rowCount={tableData.length}
                      rowGetter={({ index }) => tableData[index]}
                    >
                      <Column
                        className="column"
                        label="장소"
                        dataKey="station_nm"
                        width={width + 400}
                      />
                      <Column
                        className="column"
                        label="시간"
                        dataKey="time_div"
                        width={width + 600}
                      />
                      {/*<Column
                      className="column"
                      label="안개탐지"
                      dataKey="observation_time"
                      width={width}
                    />*/}
                      <Column
                        className="column"
                        label="온도(℃)"
                        dataKey="avg_temperature"
                        width={width}
                      />
                      <Column
                        className="column"
                        label="습도(%)"
                        dataKey="avg_humid"
                        width={width}
                      />
                      <Column
                        className="column"
                        label="초미세먼지(μg/㎥)"
                        dataKey="avg_pm25"
                        width={width + 200}
                      />
                    </VTable>
                  )}
                </AutoSizer>
              </div>
            ) : (
              <div className="dataTable">
                <AutoSizer>
                  {({ width }) => (
                    <VTable
                      rowClassName="table-row"
                      headerHeight={55}
                      width={width}
                      height={1000}
                      rowHeight={60}
                      rowCount={tableData.length}
                      rowGetter={({ index }) => tableData[index]}
                    >
                      <Column
                        className="column"
                        label="장소"
                        dataKey="station_nm"
                        width={width + 400}
                      />
                      <Column
                        className="column"
                        label="시간"
                        dataKey="time_div"
                        width={width + 600}
                      />
                      <Column
                        className="column"
                        label="안개탐지"
                        dataKey="day_type"
                        width={width}
                      />
                      <Column
                        className="column"
                        label="온도(℃)"
                        dataKey="avg_temperature"
                        width={width}
                      />
                      <Column
                        className="column"
                        label="습도(%)"
                        dataKey="avg_humid"
                        width={width}
                      />
                      <Column
                        className="column"
                        label="초미세먼지(μg/㎥)"
                        dataKey="avg_pm25"
                        width={width + 300}
                      />
                    </VTable>
                  )}
                </AutoSizer>
              </div>
            )}
          </div>
          <div className="clearBoth"></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ObservedData;
