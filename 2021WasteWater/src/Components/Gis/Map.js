import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import './scss/Map.css';
import 'ol/ol.css';

const Map = ({ mapSource, nightMapSource }) => {
  const mapRef = useRef();
  const map = useSelector((state) => state.map.map);

  useEffect(() => {
    const baseLayer = map
      .getLayers()
      .getArray()
      .filter((element) => element.values_.layerName === 'base')[0];

    const nightMapLayer = map
      .getLayers()
      .getArray()
      .filter((element) => element.values_.layerName === 'night')[0];

    baseLayer.setSource(mapSource);
    nightMapLayer.setSource(nightMapSource);

    map.setTarget(mapRef.current);
  }, [map, mapSource, nightMapSource]);

  return <div className="mapWrap" ref={mapRef}></div>;
};

export default Map;
