import Cookies from 'js-cookie';
import { call, put } from 'redux-saga/effects';
import { startloading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startloading(type));
    try {
      const response = yield call(request, action.payload);
      /*client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;*/
      Cookies.set('Authorization', response.data.token);
      yield put({
        type: SUCCESS,
        payload: response.data.token,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
