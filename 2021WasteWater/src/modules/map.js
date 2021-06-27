import { createAction, handleActions } from 'redux-actions';

import * as ol from 'ol';
import * as proj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import View from 'ol/View';
import { defaults as Control } from 'ol/control';

const view = new View({
  center: proj.fromLonLat([126.653713, 37.31085]),
  zoom: 10,
  maxZoom: 18,
  minZoom: 8,
});

const createMap = () => {
  //Base 일반, Hybrid 강조 레이어, midnight 야간모드
  const baseLayer = new TileLayer();
  const nightMapLayer = new TileLayer();
  const markerLayer = new VectorLayer();

  baseLayer.set('layerName', 'base');
  nightMapLayer.set('layerName', 'night');
  markerLayer.set('layerName', 'marker');

  const map = new ol.Map({
    layers: [baseLayer, nightMapLayer, markerLayer],
    view: view,
    controls: new Control({
      zoom: false,
    }),
  });

  return map;
};

const RESET = 'map/RESET';

export const reset_map = createAction(RESET);

const initialState = {
  map: createMap(),
};

const map = handleActions(
  {
    [RESET]: () => ({
      map: createMap(),
    }),
  },
  initialState
);

export default map;
