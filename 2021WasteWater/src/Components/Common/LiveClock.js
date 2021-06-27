import moment from 'moment';
import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const date = new Date();
  const [curTime, setCurTime] = useState(
    moment(date).format('YYYY.MM.DD A HH:mm')
  );

  const setTime = () => {
    const _date = new Date();
    const _curDate = moment(_date).format('YYYY.MM.DD A HH:mm');
    setCurTime(_curDate);
  };

  const getTime = setInterval(setTime, 1000);

  useEffect(() => {
    return () => clearInterval(getTime);
  }, [getTime]);

  return <div className="date">{curTime}</div>;
};

export default LiveClock;
