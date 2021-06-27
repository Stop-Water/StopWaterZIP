import { createAction, handleActions } from 'redux-actions';

const UPDATE_WRONG_DATA = 'adminStatistic/UPDATE_WRONG_DATA';
const UPDATE_NON_DATA = 'adminStatistic/UPDATE_NON_DATA';
const UPDATE_WRONG_TABLE_DATA = 'adminStatistic/UPDATE_WRONG_TABLE_DATA';
const UPDATE_NON_TABLE_DATA = 'adminStatistic/UPDATE_NON_TABLE_DATA';
const RESET_STATISTIC_DATA = 'adminStatistic/RESET_STATISTIC_DATA';

export const updateWrongData = createAction(UPDATE_WRONG_DATA);
export const updateNonData = createAction(UPDATE_NON_DATA);
export const updateWrongTableData = createAction(UPDATE_WRONG_TABLE_DATA);
export const updateNonTableData = createAction(UPDATE_NON_TABLE_DATA);
export const resetStatisticData = createAction(RESET_STATISTIC_DATA);

const initialState = {
  wrongData: null,
  nonData: null,
  wrongTableData: null,
  nonTableData: null,
};

const adminStatistic = handleActions(
  {
    [UPDATE_WRONG_DATA]: (state, action) => ({
      ...state,
      wrongData: action.payload,
    }),
    [UPDATE_NON_DATA]: (state, action) => ({
      ...state,
      nonData: action.payload,
    }),
    [UPDATE_WRONG_TABLE_DATA]: (state, action) => ({
      ...state,
      wrongTableData: action.payload,
    }),
    [UPDATE_NON_TABLE_DATA]: (state, action) => ({
      ...state,
      nonTableData: action.payload,
    }),
    [RESET_STATISTIC_DATA]: () => {
      return initialState;
    },
  },
  initialState
);

export default adminStatistic;
