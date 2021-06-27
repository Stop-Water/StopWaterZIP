import { createAction, handleActions } from 'redux-actions';

const UPDATE_FLUX_DATA = 'statistic/UPDATE_FLUX_DATA';
const UPDATE_FOULODER_DATA = 'statistic/UPDATE_FOULODER_DATA';
const UPDATE_QUALITY_DATA = 'statistic/UPDATE_QUALITY_DATA';
const UPDATE_TABLE_DATA = 'statistic/UPDATE_TABLE_DATA';
const RESET_STATISTIC_DATA = 'statistic/RESET_STATISTIC_DATA';

export const updateFluxData = createAction(UPDATE_FLUX_DATA);
export const updateFouloderData = createAction(UPDATE_FOULODER_DATA);
export const updateQualityData = createAction(UPDATE_QUALITY_DATA);
export const updateTableData = createAction(UPDATE_TABLE_DATA);
export const resetStatisticData = createAction(RESET_STATISTIC_DATA);

const initialState = {
  fluxData: null,
  qualityData: null,
  foulOderData: null,
  tableData: null,
};

const statistic = handleActions(
  {
    [UPDATE_FLUX_DATA]: (state, action) => ({
      ...state,
      fluxData: action.payload,
    }),
    [UPDATE_FOULODER_DATA]: (state, action) => ({
      ...state,
      foulOderData: action.payload,
    }),
    [UPDATE_QUALITY_DATA]: (state, action) => ({
      ...state,
      qualityData: action.payload,
    }),
    [UPDATE_TABLE_DATA]: (state, action) => ({
      ...state,
      tableData: action.payload,
    }),
    [RESET_STATISTIC_DATA]: () => {
      return initialState;
    },
  },
  initialState
);

export default statistic;
