import { createAction, handleActions } from 'redux-actions';

const UPDATE_IS_LEGEND_OPEN = 'gisMenu/UPDATE_IS_LEGEND_OPEN';
const UPDATE_MAP = 'gisMenu/UPDATE_MAP';
const UPDATE_LEGEND = 'gisMenu/UPDATE_LEGEND';

export const updateIsLegendOpen = createAction(UPDATE_IS_LEGEND_OPEN);
export const updateMap = createAction(UPDATE_MAP);
export const updateLegend = createAction(UPDATE_LEGEND);

const initialState = {
  isLegendOpen: false,
  selectedMap: 'flux',
  selectedLegend: 'waterLevel',
};

const gisMenu = handleActions(
  {
    [UPDATE_IS_LEGEND_OPEN]: (state, action) => ({
      ...state,
      isLegendOpen: action.payload,
    }),
    [UPDATE_MAP]: (state, action) => ({
      ...state,
      selectedMap: action.payload,
    }),
    [UPDATE_LEGEND]: (state, action) => ({
      ...state,
      selectedLegend: action.payload,
    }),
  },
  initialState
);

export default gisMenu;
