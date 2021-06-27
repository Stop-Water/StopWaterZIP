import { createAction, handleActions } from 'redux-actions';

const INSERT_FLUX_RT_DATA = 'dashBoard/INSERT_FLUX_RT_DATA';
const INSERT_FOULODER_RT_DATA = 'dashBoard/INSERT_FOULODER_RT_DATA';
const INSERT_QUALITY_RT_DATA = 'dashBoard/INSERT_QUALITY_RT_DATA';
const INSERT_FLUX_TB_DATA = 'dashBoard/INSERT_FLUX_TB_DATA';
const INSERT_QUALITY_TB_DATA = 'dashBoard/INSERT_QUALITY_TB_DATA';
const INSERT_FOULODER_TB_DATA = 'dashBoard/INSERT_FOULODER_TB_DATA';
const REMOVE_FLUX_RT_DATA = 'dashBoard/REMOVE_FLUX_RT_DATA';
const REMOVE_FOULODER_RT_DATA = 'dashBoard/REMOVE_FOULODER_RT_DATA';
const REMOVE_QUALITY_RT_DATA = 'dashBoard/REMOVE_QUALITY_RT_DATA';
const REMOVE_FLUX_TB_DATA = 'dashBoard/REMOVE_FLUX_TB_DATA';
const REMOVE_FOULODER_TB_DATA = 'dashBoard/REMOVE_FOULODER_TB_DATA';
const REMOVE_QUALITY_TB_DATA = 'dashBoard/REMOVE_QUALITY_TB_DATA';
const RESET_DASHBOARD_DATA = 'dashBoard/RESET_DASHBOARD_DATA';

export const insertFluxRTData = createAction(INSERT_FLUX_RT_DATA);
export const insertQualityRTData = createAction(INSERT_QUALITY_RT_DATA);
export const insertFoulOderRTData = createAction(INSERT_FOULODER_RT_DATA);
export const insertFluxTBData = createAction(INSERT_FLUX_TB_DATA);
export const insertQualityTBData = createAction(INSERT_QUALITY_TB_DATA);
export const insertFoulOderTBData = createAction(INSERT_FOULODER_TB_DATA);
export const removeFluxRTData = createAction(REMOVE_FLUX_RT_DATA);
export const removeQualityRTData = createAction(REMOVE_QUALITY_RT_DATA);
export const removeFoulOderRTData = createAction(REMOVE_FOULODER_RT_DATA);
export const removeFluxTBData = createAction(REMOVE_FLUX_TB_DATA);
export const removeQualityTBData = createAction(REMOVE_QUALITY_TB_DATA);
export const removeFoulOderTBData = createAction(REMOVE_FOULODER_TB_DATA);
export const resetDashBoardData = createAction(RESET_DASHBOARD_DATA);

const initialState = {
  fluxRTData: {
    xaxis: [],
    inSpeed: [],
    outSpeed: [],
    deposition: [],
    flux: [],
    waterLv: [],
  },
  qualityRTData: {
    xaxis: [],
    quality: [],
  },
  foulOderRTData: {
    xaxis: [],
    nh3: [],
    co: [],
    h2s: [],
    tol: [],
  },
  fluxTBData: [],
  qualityTBData: [],
  foulOderTBData: [],
};

const dashBoard = handleActions(
  {
    [INSERT_FLUX_RT_DATA]: (state, action) => ({
      ...state,
      fluxRTData: {
        ...state.fluxRTData,
        xaxis: state.fluxRTData.xaxis.concat(action.payload.xaxis),
        inSpeed: state.fluxRTData.inSpeed.concat(action.payload.inSpeed),
        outSpeed: state.fluxRTData.outSpeed.concat(action.payload.outSpeed),
        deposition: state.fluxRTData.deposition.concat(
          action.payload.deposition
        ),
        flux: state.fluxRTData.flux.concat(action.payload.flux),
        waterLv: state.fluxRTData.waterLv.concat(action.payload.waterLv),
      },
    }),
    [INSERT_FOULODER_RT_DATA]: (state, action) => ({
      ...state,
      foulOderRTData: {
        ...state.foulOderRTData,
        xaxis: state.foulOderRTData.xaxis.concat(action.payload.xaxis),
        nh3: state.foulOderRTData.nh3.concat(action.payload.nh3),
        co: state.foulOderRTData.co.concat(action.payload.co),
        h2s: state.foulOderRTData.h2s.concat(action.payload.h2s),
        tol: state.foulOderRTData.tol.concat(action.payload.tol),
      },
    }),
    [INSERT_QUALITY_RT_DATA]: (state, action) => ({
      ...state,
      qualityRTData: {
        ...state.qualityRTData,
        xaxis: state.qualityRTData.xaxis.concat(action.payload.xaxis),
        quality: state.qualityRTData.quality.concat(action.payload.quality),
      },
    }),
    [INSERT_FLUX_TB_DATA]: (state, action) => ({
      ...state,
      fluxTBData: state.fluxTBData.concat(action.payload),
    }),
    [INSERT_QUALITY_TB_DATA]: (state, action) => ({
      ...state,
      qualityTBData: state.qualityTBData.concat(action.payload),
    }),
    [INSERT_FOULODER_TB_DATA]: (state, action) => ({
      ...state,
      foulOderTBData: state.foulOderTBData.concat(action.payload),
    }),
    [REMOVE_FLUX_RT_DATA]: (state, action) => ({
      ...state,
      fluxRTData: {
        ...state.fluxRTData,
        xaxis: state.fluxRTData.xaxis.slice(1, 10),
        inSpeed: state.fluxRTData.inSpeed.slice(1, 10),
        outSpeed: state.fluxRTData.outSpeed.slice(1, 10),
        deposition: state.fluxRTData.deposition.slice(1, 10),
        flux: state.fluxRTData.flux.slice(1, 10),
        waterLv: state.fluxRTData.waterLv.slice(1, 10),
      },
    }),
    [REMOVE_FOULODER_RT_DATA]: (state, action) => ({
      ...state,
      foulOderRTData: {
        ...state.foulOderRTData,
        xaxis: state.foulOderRTData.xaxis.slice(1, 10),
        nh3: state.foulOderRTData.nh3.slice(1, 10),
        co: state.foulOderRTData.co.slice(1, 10),
        h2s: state.foulOderRTData.h2s.slice(1, 10),
        tol: state.foulOderRTData.tol.slice(1, 10),
      },
    }),
    [REMOVE_QUALITY_RT_DATA]: (state, action) => ({
      ...state,
      qualityRTData: {
        ...state.qualityRTData,
        xaxis: state.qualityRTData.xaxis.slice(1, 10),
        quality: state.qualityRTData.quality.slice(1, 10),
      },
    }),
    [REMOVE_FLUX_TB_DATA]: (state, action) => ({
      ...state,
      fluxTBData: state.fluxTBData.slice(1, 10),
    }),
    [REMOVE_QUALITY_TB_DATA]: (state, action) => ({
      ...state,
      qualityTBData: state.qualityTBData.slice(1, 10),
    }),
    [REMOVE_FOULODER_TB_DATA]: (state, action) => ({
      ...state,
      foulOderTBData: state.foulOderTBData.slice(1, 10),
    }),
    [RESET_DASHBOARD_DATA]: () => {
      return initialState;
    },
  },
  initialState
);

export default dashBoard;
