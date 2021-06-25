import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react';
import { VisibilityWrap } from '../Components';

const VisensorPage = () => {
  const style = {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    zIndex: '999',
    backgroundColor: 'white',
  };
  return (
    <div style={style}>
      <VisibilityWrap />
    </div>
  );
};

export default VisensorPage;
