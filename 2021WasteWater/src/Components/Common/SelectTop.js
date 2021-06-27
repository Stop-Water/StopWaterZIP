import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStationList from '../../lib/useStationList';
import useWeatherData from '../../lib/useWeatherData';
import LiveClock from '../Common/LiveClock';

import {
  updateSelectedCoordi,
  updateSelectedStation,
  updateSelectedStationName,
} from '../../modules/common';

import './scss/SelectTop.scss';

const WHETHER_ICON = {
  sunny: (
    <svg className="weatherIcon" viewBox="0 0 36.514 36.513">
      <g transform="translate(1.25 1.25)">
        <g>
          <ellipse
            cx="10.006"
            cy="10.006"
            rx="10.006"
            ry="10.006"
            transform="translate(7.001 7.001)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            y1="2.379"
            transform="translate(17.006)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x1="1.682"
            y1="1.682"
            transform="translate(4.981 4.981)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x1="2.379"
            transform="translate(0 17.006)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x1="1.682"
            y2="1.682"
            transform="translate(4.981 27.35)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            y2="2.379"
            transform="translate(17.006 31.634)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x2="1.682"
            y2="1.682"
            transform="translate(27.349 27.35)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x2="2.379"
            transform="translate(31.634 17.006)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            y1="1.682"
            x2="1.682"
            transform="translate(27.349 4.981)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </g>
    </svg>
  ),
  cloud: (
    <svg className="weatherIcon" viewBox="0 0 33.833 22.297">
      <g transform="translate(1.25 1.25)">
        <path
          d="M229.768,223.3a5.9,5.9,0,0,1-5.9,5.9H202.1a3.661,3.661,0,1,1,0-7.323c.107,0,.21,0,.316.014a5.025,5.025,0,0,1-.316-1.762,5.133,5.133,0,0,1,8.374-3.985,6.77,6.77,0,0,1,13.54.028,6.558,6.558,0,0,1-.116,1.219A5.905,5.905,0,0,1,229.768,223.3Z"
          transform="translate(-198.435 -209.404)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  ),
  rain: (
    <svg className="weatherIcon" viewBox="0 0 33.187 31.444">
      <g transform="translate(1.25 1.25)">
        <path
          d="M344.621,332.88a5.782,5.782,0,0,1-5.783,5.783H317.523a3.586,3.586,0,1,1,0-7.172c.105,0,.205,0,.31.013a4.923,4.923,0,0,1-.31-1.726,5.027,5.027,0,0,1,8.2-3.9,6.63,6.63,0,0,1,13.26.027,6.41,6.41,0,0,1-.114,1.193A5.785,5.785,0,0,1,344.621,332.88Z"
          transform="translate(-313.935 -319.274)"
          fill="none"
          stroke="#1f2633"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="2.196"
          y2="5.053"
          transform="translate(18.277 23.496)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="2.196"
          y2="5.053"
          transform="translate(13.147 23.496)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="2.196"
          y2="5.053"
          transform="translate(8.017 23.496)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  ),
  cloudy: (
    <svg className="weatherIcon" viewBox="0 0 40.555 28.196">
      <g transform="translate(1.25 1.25)">
        <g transform="translate(0)">
          <path
            d="M6.111,12.406h0a6.2,6.2,0,1,1,6.3-6.2,6.272,6.272,0,0,1-.073.957,5.641,5.641,0,0,0-.651-.038,5.575,5.575,0,0,0-5.572,5.283Z"
            transform="translate(4.342 4.341)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            y1="1.475"
            transform="translate(10.544)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x1="1.043"
            y1="1.043"
            transform="translate(3.088 3.088)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x1="1.475"
            transform="translate(0 10.544)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            x1="1.043"
            y2="1.043"
            transform="translate(3.088 16.957)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <line
            y1="1.043"
            x2="1.043"
            transform="translate(16.957 3.088)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
        <g transform="translate(6.722 5.899)">
          <path
            d="M229.768,223.3a5.9,5.9,0,0,1-5.9,5.9H202.1a3.661,3.661,0,1,1,0-7.323c.107,0,.21,0,.316.014a5.025,5.025,0,0,1-.316-1.762,5.133,5.133,0,0,1,8.374-3.985,6.77,6.77,0,0,1,13.54.028,6.558,6.558,0,0,1-.116,1.219A5.905,5.905,0,0,1,229.768,223.3Z"
            transform="translate(-198.435 -209.404)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </g>
    </svg>
  ),
  snow: (
    <svg className="weatherIcon" viewBox="0 0 27.756 30.605">
      <g transform="translate(1.708 1.25)">
        <line
          y2="28.105"
          transform="translate(12.17)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          y1="14.053"
          x2="24.34"
          transform="translate(0 7.026)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="24.34"
          y1="14.053"
          transform="translate(0 7.026)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M220.762,324.553l-3.677,3.677-3.677-3.677"
          transform="translate(-204.916 -321.843)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M207.113,327.659l1.346,5.023-5.023,1.346"
          transform="translate(-202.929 -322.462)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M203.436,341.825l5.023,1.346-1.346,5.023"
          transform="translate(-202.929 -325.285)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M213.408,351.969l3.677-3.677,3.677,3.677"
          transform="translate(-204.916 -326.574)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M227.637,348.193l-1.346-5.023,5.023-1.346"
          transform="translate(-207.482 -325.285)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M231.314,334.028l-5.023-1.346,1.346-5.023"
          transform="translate(-207.482 -322.462)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  ),
  rainsnow: (
    <svg className="weatherIcon" viewBox="0 0 33.187 31.444">
      <g transform="translate(1.25 1.25)">
        <path
          d="M344.621,332.88a5.782,5.782,0,0,1-5.783,5.783H317.523a3.586,3.586,0,1,1,0-7.172c.105,0,.205,0,.31.013a4.923,4.923,0,0,1-.31-1.726,5.027,5.027,0,0,1,8.2-3.9,6.63,6.63,0,0,1,13.26.027,6.41,6.41,0,0,1-.114,1.193A5.785,5.785,0,0,1,344.621,332.88Z"
          transform="translate(-313.935 -319.274)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="0.622"
          y2="1.853"
          transform="translate(19.851 23.496)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="2.196"
          y2="5.053"
          transform="translate(13.147 23.496)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          x1="0.362"
          y2="0.853"
          transform="translate(9.851 23.496)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          transform="translate(7.851 28.35)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <line
          transform="translate(18.473 28.35)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  ),
};

const SelectTop = () => {
  const dispatch = useDispatch();
  const { stationName, stationCoordi } = useSelector((state) => ({
    stationName: state.common.selectedStationName,
    stationCoordi: state.common.selectedCoordi,
  }));
  const stationList = useStationList();
  const weatherData = useWeatherData(stationCoordi[0], stationCoordi[1]);

  //const [curLocation, setCurLocation] = useState(null);

  /* const getLocationCallback = (result) => {
    setCurLocation(
      `${result[0].region_1depth_name} ${result[0].region_2depth_name}`
    );
  };

  getLocationName(stationCoordi[0], stationCoordi[1], getLocationCallback); */

  const handleStationChange = (e) => {
    const _selectedStation = e.target.value;
    const _selectedStationName =
      e.target.options[e.target.selectedIndex].dataset.name;
    const _xyCoord = [
      parseFloat(e.target.options[e.target.selectedIndex].dataset.lat),
      parseFloat(e.target.options[e.target.selectedIndex].dataset.lon),
    ];
    dispatch(updateSelectedStation(_selectedStation));
    dispatch(updateSelectedStationName(_selectedStationName));
    dispatch(updateSelectedCoordi(_xyCoord));
  };

  const setSkyIcon = (sky, rain) => {
    if (sky === '1') {
      return WHETHER_ICON.sunny;
    } else if (sky === '1') {
      return WHETHER_ICON.rain;
    } else if (sky === '2') {
      return WHETHER_ICON.rainsnow;
    } else if (sky === '3' && rain !== '3') {
      return WHETHER_ICON.cloud;
    } else if (sky === '3' && rain === '3') {
      return WHETHER_ICON.snow;
    } else if (sky === '4' && rain !== '4') {
      return WHETHER_ICON.cloudy;
    } else if (sky === '4' && rain === '4') {
      return WHETHER_ICON.rain;
    } else if (sky === '5') {
      return WHETHER_ICON.rain;
    } else if (sky === '6') {
      return WHETHER_ICON.rainsnow;
    } else if (sky === '7') {
      return WHETHER_ICON.snow;
    } else {
      return null;
    }
  };

  if (!weatherData || !stationList) return null;
  return (
    <div className="selectTopWrap">
      <div className="placeSelectContainer">
        <div className="placeName">{`· ${stationName}`}</div>
        <select className="placeSelect" onChange={handleStationChange}>
          {stationList &&
            stationList.map((station) => (
              <option
                key={station.obsrvtId}
                value={station.obsrvtId}
                data-name={station.obsrvtNm}
                data-lon={station.lon}
                data-lat={station.lat}
              >
                {station.obsrvtNm}
              </option>
            ))}
        </select>
      </div>
      <div className="dateContainer">
        <LiveClock />
        <div className="weatherBox">
          <div className="weatherIconContainer">
            {/* <svg className="weatherIcon" viewBox="0 0 33.833 22.297">
                <g transform="translate(1.25 1.25)">
                    <path d="M229.768,223.3a5.9,5.9,0,0,1-5.9,5.9H202.1a3.661,3.661,0,1,1,0-7.323c.107,0,.21,0,.316.014a5.025,5.025,0,0,1-.316-1.762,5.133,5.133,0,0,1,8.374-3.985,6.77,6.77,0,0,1,13.54.028,6.558,6.558,0,0,1-.116,1.219A5.905,5.905,0,0,1,229.768,223.3Z" transform="translate(-198.435 -209.404)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </g>
            </svg> 구름 */}
            {/* <svg className="weatherIcon" viewBox="0 0 33.187 31.444">
                <g transform="translate(1.25 1.25)">
                    <path d="M344.621,332.88a5.782,5.782,0,0,1-5.783,5.783H317.523a3.586,3.586,0,1,1,0-7.172c.105,0,.205,0,.31.013a4.923,4.923,0,0,1-.31-1.726,5.027,5.027,0,0,1,8.2-3.9,6.63,6.63,0,0,1,13.26.027,6.41,6.41,0,0,1-.114,1.193A5.785,5.785,0,0,1,344.621,332.88Z" transform="translate(-313.935 -319.274)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <line x1="2.196" y2="5.053" transform="translate(18.277 23.496)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <line x1="2.196" y2="5.053" transform="translate(13.147 23.496)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <line x1="2.196" y2="5.053" transform="translate(8.017 23.496)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </g>
            </svg> 비 */}
            {/* <svg className="weatherIcon" viewBox="0 0 27.756 30.605">
                <g transform="translate(1.708 1.25)">
                    <line y2="28.105" transform="translate(12.17)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <line y1="14.053" x2="24.34" transform="translate(0 7.026)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <line x1="24.34" y1="14.053" transform="translate(0 7.026)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <path d="M220.762,324.553l-3.677,3.677-3.677-3.677" transform="translate(-204.916 -321.843)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <path d="M207.113,327.659l1.346,5.023-5.023,1.346" transform="translate(-202.929 -322.462)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <path d="M203.436,341.825l5.023,1.346-1.346,5.023" transform="translate(-202.929 -325.285)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <path d="M213.408,351.969l3.677-3.677,3.677,3.677" transform="translate(-204.916 -326.574)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <path d="M227.637,348.193l-1.346-5.023,5.023-1.346" transform="translate(-207.482 -325.285)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    <path d="M231.314,334.028l-5.023-1.346,1.346-5.023" transform="translate(-207.482 -322.462)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </g>
            </svg> 눈 */}
            {/* <svg className="weatherIcon" viewBox="0 0 40.555 28.196">
                <g transform="translate(1.25 1.25)">
                    <g transform="translate(0)">
                        <path d="M6.111,12.406h0a6.2,6.2,0,1,1,6.3-6.2,6.272,6.272,0,0,1-.073.957,5.641,5.641,0,0,0-.651-.038,5.575,5.575,0,0,0-5.572,5.283Z" transform="translate(4.342 4.341)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        <line y1="1.475" transform="translate(10.544)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        <line x1="1.043" y1="1.043" transform="translate(3.088 3.088)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        <line x1="1.475" transform="translate(0 10.544)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        <line x1="1.043" y2="1.043" transform="translate(3.088 16.957)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        <line y1="1.043" x2="1.043" transform="translate(16.957 3.088)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    </g>
                    <g transform="translate(6.722 5.899)">
                        <path d="M229.768,223.3a5.9,5.9,0,0,1-5.9,5.9H202.1a3.661,3.661,0,1,1,0-7.323c.107,0,.21,0,.316.014a5.025,5.025,0,0,1-.316-1.762,5.133,5.133,0,0,1,8.374-3.985,6.77,6.77,0,0,1,13.54.028,6.558,6.558,0,0,1-.116,1.219A5.905,5.905,0,0,1,229.768,223.3Z" transform="translate(-198.435 -209.404)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    </g>
                </g>
            </svg> 흐림 */}
            {/* <svg className="weatherIcon" viewBox="0 0 33.187 31.444">
              <g transform="translate(1.25 1.25)">
                <path d="M344.621,332.88a5.782,5.782,0,0,1-5.783,5.783H317.523a3.586,3.586,0,1,1,0-7.172c.105,0,.205,0,.31.013a4.923,4.923,0,0,1-.31-1.726,5.027,5.027,0,0,1,8.2-3.9,6.63,6.63,0,0,1,13.26.027,6.41,6.41,0,0,1-.114,1.193A5.785,5.785,0,0,1,344.621,332.88Z" transform="translate(-313.935 -319.274)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                <line x1="0.622" y2="1.853" transform="translate(19.851 23.496)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                <line x1="2.196" y2="5.053" transform="translate(13.147 23.496)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                <line x1="0.362" y2="0.853" transform="translate(9.851 23.496)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                <line transform="translate(7.851 28.35)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                <line transform="translate(18.473 28.35)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </g>
            </svg> 눈+비*/}
            {/* <svg className="weatherIcon" viewBox="0 0 36.514 36.513">
              <g transform="translate(1.25 1.25)">
                <g>
                  <ellipse
                    cx="10.006"
                    cy="10.006"
                    rx="10.006"
                    ry="10.006"
                    transform="translate(7.001 7.001)"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    y1="2.379"
                    transform="translate(17.006)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="1.682"
                    y1="1.682"
                    transform="translate(4.981 4.981)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="2.379"
                    transform="translate(0 17.006)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="1.682"
                    y2="1.682"
                    transform="translate(4.981 27.35)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    y2="2.379"
                    transform="translate(17.006 31.634)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    x2="1.682"
                    y2="1.682"
                    transform="translate(27.349 27.35)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    x2="2.379"
                    transform="translate(31.634 17.006)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <line
                    y1="1.682"
                    x2="1.682"
                    transform="translate(27.349 4.981)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </g>
              </g>
            </svg> */}
            {setSkyIcon(weatherData.sky, weatherData.rain)}
          </div>
          <div className="temperature">
            {weatherData.temp}
            <span>℃</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTop;
