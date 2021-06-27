import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK'
);

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.loginCheck);
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
    const path = window.location.pathname.toString();
    if (
      path === '/' ||
      path === '/gis' ||
      path === '/statistics' ||
      path === '/admin/place' ||
      path === '/admin/data' ||
      path === '/admin/user'
    )
      window.location.href = '/login';
  } catch (e) {
    console.log('checkFailureSaga error');
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}

const initialState = {
  user: null,
  userName: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload }) => ({
      ...state,
      user: payload.userId,
      userName: payload.userNm,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      userName: null,
      checkError: error,
    }),
  },
  initialState
);
