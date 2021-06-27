import React from 'react';

const LegendMenuContainer = ({ isLegendOepn, children }) => {
  return (
    <div
      className={
        isLegendOepn ? 'legendMenuContainer on' : 'legendMenuContainer'
      }
    >
      {children}
    </div>
  );
};

export default LegendMenuContainer;
