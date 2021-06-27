import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './scss/Loading.scss';

const Loading = () => {
  return (
    <div className="CircularLoding">
      <CircularProgress className="CircularProgress" />
    </div>
  );
};

export default Loading;
