import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestUserSaga, {
  createRequestActionTypes,
} from '../lib/createRequestUserSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const removeNum = (string) => {
  const result = string.replace(/[0-9]/gi, '');
  return result;
};

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);

const checkSaga = createRequestUserSaga(CHECK, authAPI.check);
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
    const path = window.location.pathname.toString();
    const filteredPath = removeNum(path);
    if (
      path === '/siheung/admin' ||
      filteredPath === '/siheung/notice/write' ||
      filteredPath === '/siheung/notice/edit/'
    )
      window.location.href = '/siheung/login';
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
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
  },
  initialState,
);
