import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import map from './map';
import menu from './menu';
import gisMenu from './gisMenu';
import common from './common';
import statistic from './statistic';
import dashBoard from './dashBoard';
import admin, { stationDataSaga } from './admin';
import adminStatistic from './adminStatistic';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';

const rootReducer = combineReducers({
  map,
  menu,
  gisMenu,
  common,
  statistic,
  dashBoard,
  admin,
  auth,
  user,
  loading,
  adminStatistic,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), stationDataSaga()]);
}

export default rootReducer;
