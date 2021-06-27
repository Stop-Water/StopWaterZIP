import { createAction, handleActions } from 'redux-actions';

const UPDATE_MENU = 'menu/UPDATE_MENU';
const UPDATAE_ADMINMENU = 'menu/UPDATE_ADMINMENU';
const UPDATE_IS_MOBILE_OPEN = 'menu/UPDATE_IS_MOBILE_OPEN';
const UPDATE_IS_FOOTER_OPEN = 'menu/UPDATE_IS_FOOTER_OPEN';

export const updateMenu = createAction(UPDATE_MENU);
export const updateAdminMenu = createAction(UPDATAE_ADMINMENU);
export const updateIsMobileOpen = createAction(UPDATE_IS_MOBILE_OPEN);
export const updateIsFooterOpen = createAction(UPDATE_IS_FOOTER_OPEN);

const initialState = {
  selectedMenu: 'dashboard',
  selectedAdminMenu: 'place',
  isMobileOpen: false,
  isFooterOpen: false,
};

const menu = handleActions(
  {
    [UPDATE_MENU]: (state, action) => ({
      ...state,
      selectedMenu: action.payload,
    }),
    [UPDATAE_ADMINMENU]: (state, action) => ({
      ...state,
      selectedAdminMenu: action.payload,
    }),
    [UPDATE_IS_MOBILE_OPEN]: (state, action) => ({
      ...state,
      isMobileOpen: action.payload,
    }),
    [UPDATE_IS_FOOTER_OPEN]: (state, action) => ({
      ...state,
      isFooterOpen: action.payload,
    }),
  },
  initialState
);

export default menu;
