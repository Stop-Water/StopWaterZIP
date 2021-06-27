import React from 'react';

import MapWrap from '../Components/Gis/MapWrap';
import SelectTop from '../Components/Common/SelectTop';
import MapSelectBox from '../Components/Gis/MapSelectBox/MapSelectBox';
import MapLegend from '../Components/Gis/MapLegend/MapLegend';
import MapMarker from '../Components/Gis/MapMarker/MapMarker';

const GisMonitoring = () => {
  return (
    <div className="mapPage">
      <MapWrap />
      <SelectTop />
      <MapSelectBox />
      <MapLegend />
      <MapMarker />
    </div>
  );
};

export default GisMonitoring;
