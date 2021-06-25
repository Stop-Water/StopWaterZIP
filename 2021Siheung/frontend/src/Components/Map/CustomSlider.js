import React from 'react';
import Slider from '@material-ui/core/Slider';
import './CSS/CustomSlider.css';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const sliderMarks = [
  {
    value: 0,
    label: '현재',
  },
  {
    value: 1,
    label: '1시간 후',
  },
  {
    value: 2,
    label: '2시간 후',
  },
  {
    value: 3,
    label: '3시간 후',
  },
];

const FogSlider = withStyles({
  root: {
    color: '#606162',
    height: 8,
    '@media (pointer: coarse)': {
      padding: 'inherit',
    },
    '@media (max-width: 1200px)': {
      padding: '20px 0',
      marginBottom: '8px',
    },
  },
  thumb: {
    height: 23,
    width: 23,
    backgroundColor: '#606162',
    border: '5px solid #fff',
    marginTop: -8,
    marginLeft: -12,
    boxShadow:
      '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',

    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 0px 0px rgba(0,0,0,0.1),0 6px 9px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
    },
  },
  mark: {
    display: 'none',
  },
  active: {},
  markLabel: {
    fontSize: '1.5rem',
    '@media (pointer: coarse)': {
      top: '26px',
    },
    marginTop: '8px',
    color: '#606162',
    '@media (max-width: 1200px)': {
      fontSize: '10px',
      marginTop: '13px',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CustomSlider = ({ isPlaying, handlePlay, handlechange, sliderValue }) => {
  return (
    <div className="sliderContainer">
      {isPlaying ? (
        <>
          <div className="playButton act" style={{ opacity: 1 }}>
            <FontAwesomeIcon icon={faPlay} color="#ddd" />
          </div>
        </>
      ) : sliderValue === 0 ? (
        <button className="playButton" onClick={handlePlay}>
          <FontAwesomeIcon icon={faPlay} color="#606162" />
        </button>
      ) : (
        <button className="playButton" onClick={handlePlay}>
          <FontAwesomeIcon
            icon={faPlay}
            color="#606162"
            transform={{ rotate: 180 }}
          />
        </button>
      )}
      <div className="slider">
        <FogSlider
          aria-labelledby="Fog Slider"
          step={1}
          marks={sliderMarks}
          min={0}
          max={3}
          value={sliderValue}
          valueLabelDisplay="off"
          onChangeCommitted={handlechange}
        />
      </div>
    </div>
  );
};

export default CustomSlider;
