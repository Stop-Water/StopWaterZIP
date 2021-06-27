import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as adminAPI from '../lib/api/admin';
import createRequestSaga from '../lib/createRequestSaga';

const GET_STATION_DATA = 'admin/GET_STATION_DATA';
const GET_STATION_DATA_SUCCESS = 'admin/GET_STATION_DATA_SUCCESS';

const UPDATE_SENSOR_ID = 'admin/UPDATE_SENSOR_ID';
const UPDATE_STATION_ID = 'admin/UPDATE_STATION_ID';
const UPDATE_KIND_ID = 'admin/UPDATE_KIND_ID';
const UPDATE_USER_GROUP = 'admin/UPDATE_USER_GROUP';
const UPDATE_SELECTED_USER_GROUP = 'admin/UPDATE_SELECTED_USER_GROUP';
const RESET_ADMIN_PLACE_DATA = 'admin/RESET_DATA';

export const getStationData = createAction(
  GET_STATION_DATA,
  (station) => station
);
export const updateSensorId = createAction(UPDATE_SENSOR_ID);
export const updateStationId = createAction(UPDATE_STATION_ID);
export const updateKindId = createAction(UPDATE_KIND_ID);
export const updateUserGroup = createAction(UPDATE_USER_GROUP);
export const updateSelectedUserGroup = createAction(UPDATE_SELECTED_USER_GROUP);
export const resetAdminPlaceData = createAction(RESET_ADMIN_PLACE_DATA);

const getStationDataSaga = createRequestSaga(
  GET_STATION_DATA,
  adminAPI.selectStationInfo
);

export function* stationDataSaga() {
  yield takeLatest(GET_STATION_DATA, getStationDataSaga);
}

const initialState = {
  stationData: null,
  stationImage: null,
  sensorData: null,
  sensorId: null,
  stationId: null,
  kindId: null,
  userGroup: null,
  selectedUserGroup: null,
};

const admin = handleActions(
  {
    [GET_STATION_DATA_SUCCESS]: (state, action) => ({
      ...state,
      stationData: action.payload.data.obsrvtInfo,
      stationImage: action.payload.data.imgList,
      sensorData: action.payload.data.sensorInfo,
    }),
    [UPDATE_SENSOR_ID]: (state, action) => ({
      ...state,
      sensorId: action.payload,
    }),
    [UPDATE_STATION_ID]: (state, action) => ({
      ...state,
      stationId: action.payload,
    }),
    [UPDATE_KIND_ID]: (state, action) => ({
      ...state,
      kindId: action.payload,
    }),
    [UPDATE_USER_GROUP]: (state, action) => ({
      ...state,
      userGroup: action.payload,
    }),
    [UPDATE_SELECTED_USER_GROUP]: (state, action) => ({
      ...state,
      selectedUserGroup: action.payload,
    }),
    [RESET_ADMIN_PLACE_DATA]: (state) => ({
      ...state,
      sensorId: null,
      stationId: null,
      kindId: null,
    }),
  },
  initialState
);

export default admin;
