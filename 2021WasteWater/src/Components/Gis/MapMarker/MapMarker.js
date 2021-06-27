import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import * as proj from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';

import useGisData from '../../../lib/useGisData';
import FluxInfo from './FluxInfo';
import QualityInfo from './QualityInfo';
import FoulOderInfo from './FoulOderInfo';
import InfoError from './InfoError';

import '../scss/MapMarker.scss';

const MapMarker = () => {
  const { map, selectedMap, selectedStation, isloading } = useSelector(
    (state) => ({
      map: state.map.map,
      selectedMap: state.gisMenu.selectedMap,
      selectedStation: state.common.selectedStation,
      isloading: state.common.loading,
    })
  );
  const gisData = useGisData(selectedMap, selectedStation);
  const markRef = useRef();

  useEffect(() => {
    const markerLayer = map
      .getLayers()
      .getArray()
      .filter((element) => element.values_.layerName === 'marker')[0];

    const source = new VectorSource();

    const markerOffset = () => {
      if (selectedMap === 'flux') {
        if (window.innerWidth >= 768) {
          return [-5, -241];
        } else if (window.innerWidth < 768 && window.innerWidth >= 321) {
          return [-4, -192];
        } else {
          return [-3, -144];
        }
      } else if (selectedMap === 'quality') {
        if (window.innerWidth >= 768) {
          return [-5, -100];
        } else if (window.innerWidth < 768 && window.innerWidth >= 321) {
          return [-4, -80];
        } else {
          return [-3, -60];
        }
      } else {
        if (window.innerWidth >= 768) {
          return [-4, -205];
        } else if (window.innerWidth < 768 && window.innerWidth >= 321) {
          return [-4, -164];
        } else {
          return [-3, -123];
        }
      }
    };

    const popup = new Overlay({
      element: markRef.current,
      positioning: 'bottom-center',
      offset: markerOffset(),
    });

    if (gisData) {
      const compare = new Feature({
        geometry: new Point(
          proj.fromLonLat([parseFloat(gisData.lon), parseFloat(gisData.lat)])
        ),
      });

      compare.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: 'black' }),
            stroke: new Stroke({
              color: 'white',
              width: 2,
            }),
          }),
        })
      );

      map.getView().animate({
        center: proj.fromLonLat([
          parseFloat(gisData.lon),
          parseFloat(gisData.lat),
        ]),
        duration: 300,
      });

      popup.setPosition(
        proj.fromLonLat([parseFloat(gisData.lon), parseFloat(gisData.lat)])
      );

      popup.set('overlayName', 'marker');
      map.addOverlay(popup);
      source.addFeature(compare);
      markerLayer.setSource(source);
    }

    return () => {
      map.removeOverlay(popup);
    };
  }, [map, gisData, selectedMap]);

  if (!gisData) return null;
  return (
    <div
      className={isloading ? 'mapMarkerWrap hide' : 'mapMarkerWrap'}
      ref={markRef}
    >
      <div className="markerContainer">
        <div className="markerTitle">{gisData.obsrvtNm}</div>
        {/*에러가 나거나 항목중 매우위험한 수치가 있으면 red가 생겨야합니다.*/}
        <div className="markerContents">
          <InfoError />
          {selectedMap === 'flux' ? (
            <FluxInfo data={gisData} />
          ) : selectedMap === 'quality' ? (
            <QualityInfo data={gisData} />
          ) : (
            <FoulOderInfo data={gisData} />
          )}
        </div>
      </div>
      <div className="markerPointBackgrond"></div>
      <div className="markerPoint"></div>
      {/*에러가 나면 red가 생겨야합니다.*/}
    </div>
  );
};

export default MapMarker;
