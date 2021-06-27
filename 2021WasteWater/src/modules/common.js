import { createAction, handleActions } from 'redux-actions';

const UPDATE_SELECTED_STATION = 'common/UPDATE_SELECTED_STATION';
const UPDATE_SELECTED_STATION_NAME = 'common/UPDATE_SELECTED_STATION_NAME';
const UPDATE_SELECTED_COORDI = 'common/UPDATE_SELECTED_COORDI';
const UPDATE_LOADING = 'common/UPDATE_LOADING';
const RESET_SELECTED_STATION = 'common/RESET_SELECTED_STATION';
const UPDATE_MODAL_OPEN = 'common/UPDATE_MODAL_OPEN';
const UPDATE_MODAL_KIND = 'common/UPDATE_MODAL_KIND';

export const updateSelectedStation = createAction(UPDATE_SELECTED_STATION);
export const updateSelectedStationName = createAction(
  UPDATE_SELECTED_STATION_NAME
);
export const updateSelectedCoordi = createAction(UPDATE_SELECTED_COORDI);
export const updateLoading = createAction(UPDATE_LOADING);
export const resetSelectedStation = createAction(RESET_SELECTED_STATION);
export const updateModalOpen = createAction(UPDATE_MODAL_OPEN);
export const updateModalKind = createAction(UPDATE_MODAL_KIND);

const initialState = {
  selectedStation: '100005',
  selectedStationName: '강원도 속초시',
  selectedCoordi: [36.3371732, 128.4150778],
  loading: false,
  isModalOpen: false,
  modalKind: null,
};

const common = handleActions(
  {
    [UPDATE_SELECTED_STATION]: (state, action) => ({
      ...state,
      selectedStation: action.payload,
    }),
    [UPDATE_SELECTED_STATION_NAME]: (state, action) => ({
      ...state,
      selectedStationName: action.payload,
    }),
    [UPDATE_SELECTED_COORDI]: (state, action) => ({
      ...state,
      selectedCoordi: action.payload,
    }),
    [UPDATE_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    [RESET_SELECTED_STATION]: (state, action) => ({
      ...state,
      selectedStation: '100005',
      selectedStationName: '강원도 속초시',
      selectedCoordi: [36.3371732, 128.4150778],
    }),
    [UPDATE_MODAL_OPEN]: (state, action) => ({
      ...state,
      isModalOpen: action.payload,
    }),
    [UPDATE_MODAL_KIND]: (state, action) => ({
      ...state,
      modalKind: action.payload,
    }),
  },
  initialState
);

export default common;
