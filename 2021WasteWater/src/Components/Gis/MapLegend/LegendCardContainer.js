import React from 'react';

const LegendCardContainer = ({ isLegendOpen, selectedLegend, children }) => {
  return (
    <div
      className={
        isLegendOpen && selectedLegend
          ? 'legendContainer on'
          : 'legendContainer'
      }
    >
      {children}
    </div>
  );
};

export default LegendCardContainer;
