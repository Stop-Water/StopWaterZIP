import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsMobileOpen } from '../../modules/menu';

import MenuContainer from './MenuContainer';
import ListContainer from './ListContainer';
import MenuListItem from './MenuListItem';
import AdminMenuListItem from './AdminMenuListItem';
import MobileCloseBtn from './MobileCloseBtn';
import MobileLogo from './MobileLogo';
import UserName from './UserName';
import FooterBtn from './FooterBtn';

import './scss/Menu.scss';

const MENU_ITEM = [
  {
    icon: (
      <svg viewBox="0 0 25.734 19.301">
        <path
          d="M25.131,80.084a.6.6,0,0,1,.6.6V82.7a.6.6,0,0,1-.6.6H.6a.6.6,0,0,1-.6-.6V64.6A.6.6,0,0,1,.6,64h2.01a.6.6,0,0,1,.6.6V80.084ZM18.733,68.8l-4.257,2.84-4.287-5.715a.6.6,0,0,0-1,.05L4.825,73.248v5.227h19.3l-4.519-9.439A.6.6,0,0,0,18.733,68.8Z"
          transform="translate(0 -64)"
        />
      </svg>
    ),
    name: '대시보드',
    id: 'dashboard',
    path: '/',
  },
  {
    icon: (
      <svg viewBox="0 0 21.449 26.032">
        <path
          d="M10.689,15.439A4.533,4.533,0,0,0,15.23,10.9a4.673,4.673,0,0,0-4.541-4.7,4.533,4.533,0,0,0-4.541,4.541A4.787,4.787,0,0,0,10.689,15.439ZM3.066,3.113A10.781,10.781,0,1,1,18.312,18.359l-7.623,7.623L3.066,18.359A11.075,11.075,0,0,1,3.066,3.113Z"
          transform="translate(-0.025 0.05)"
        />
      </svg>
    ),
    name: 'GIS 모니터링',
    id: 'gis',
    path: '/gis',
  },
  {
    icon: (
      <svg viewBox="0 0 22.314 22.314">
        <defs>
          <clipPath>
            <rect fill="none" />
          </clipPath>
        </defs>
        <g clipPath="url(#clipPath)">
          <rect
            transform="translate(-0.343 -0.345)"
            fill="none"
          />
          <path d="M2.789,6.973V19.525H19.525V6.973ZM18.13,2.789H20.92a1.318,1.318,0,0,1,1.395,1.395V20.92a1.318,1.318,0,0,1-1.395,1.395H1.395A1.318,1.318,0,0,1,0,20.92V4.184A1.318,1.318,0,0,1,1.395,2.789H4.184V1.395A1.318,1.318,0,0,1,5.579,0,1.318,1.318,0,0,1,6.973,1.395V2.789h8.368V1.395a1.395,1.395,0,0,1,2.789,0ZM16.736,16.736H13.947V13.947h2.789Zm-4.184,0H9.763V13.947h2.789Zm4.184-4.184H13.947V9.763h2.789Zm-4.184,0H9.763V9.763h2.789ZM8.368,16.736H5.579V13.947H8.368Z" />
        </g>
      </svg>
    ),
    name: '통계',
    id: 'statistics',
    path: '/statistics',
  },
  {
    icon: (
      <svg viewBox="0 0 22.867 26.133">
        <path d="M473.417-1156.866H455.45a2.453,2.453,0,0,1-2.451-2.45v-2.123a6.868,6.868,0,0,1,6.861-6.861h.852a8.881,8.881,0,0,0,3.721.817,8.847,8.847,0,0,0,3.721-.817h.852a6.861,6.861,0,0,1,3.331.862l-4.214,4.214-2.713-2.712a.614.614,0,0,0-.438-.182.616.616,0,0,0-.438.182l-.876.876a.616.616,0,0,0-.182.439.614.614,0,0,0,.182.437l4.026,4.027a.616.616,0,0,0,.438.182.616.616,0,0,0,.438-.182l5.7-5.7a6.868,6.868,0,0,1,1.609,4.414v2.123A2.453,2.453,0,0,1,473.417-1156.866Zm.84-8.986h0a6.847,6.847,0,0,0-1.919-1.584l1.6-1.6a.617.617,0,0,1,.438-.181.615.615,0,0,1,.438.181l.877.877a.615.615,0,0,1,.181.438.615.615,0,0,1-.181.438l-1.428,1.428Zm-9.824-4.081a6.54,6.54,0,0,1-6.533-6.533,6.54,6.54,0,0,1,6.533-6.533,6.541,6.541,0,0,1,6.534,6.533A6.541,6.541,0,0,1,464.433-1169.933Z" transform="translate(-453 1183)" />
      </svg>

    ),
    name: '관리자',
    id: 'admin',
    path: '/admin',
  },
];

const ADMINMENU_ITEM = [
  { id: 'place', name: '측정소 정보 관리', path: '/admin/place' },
  { id: 'data', name: '데이터 관리', path: '/admin/data' },
  { id: 'user', name: '사용자 관리', path: '/admin/user' },
];

const Menu = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector((state) => state.menu.selectedMenu);
  const isMobileOpen = useSelector((state) => state.menu.isMobileOpen);
  const selectedAdminMenu = useSelector(
    (state) => state.menu.selectedAdminMenu
  );

  const handleMobileCloseBtnClick = () => {
    document.body.style.overflow = 'visible';
    dispatch(updateIsMobileOpen(false));
  };

  return (
    <div className={isMobileOpen === true ? 'menuWrap onMobile' : 'menuWrap'}>
      <div className="menuBackground" onClick={handleMobileCloseBtnClick}></div>
      <MenuContainer kind="main" selectedMenu={selectedMenu}>
        <MobileCloseBtn onClick={handleMobileCloseBtnClick} />
        <ListContainer>
          {MENU_ITEM.map((item) => (
            <MenuListItem
              icon={item.icon}
              name={item.name}
              path={item.path}
              id={item.id}
              key={item.id}
              selectedMenu={selectedMenu}
            />
          ))}
        </ListContainer>
        <UserName />
        <MobileLogo onClick={handleMobileCloseBtnClick}/>
        <FooterBtn />
      </MenuContainer>
      <MenuContainer kind="sub" selectedMenu={selectedMenu}>
        <ListContainer>
          {ADMINMENU_ITEM.map((item) => (
            <AdminMenuListItem
              id={item.id}
              name={item.name}
              path={item.path}
              key={item.id}
              selectedAdminMenu={selectedAdminMenu}
            />
          ))}
        </ListContainer>
      </MenuContainer>
    </div>
  );
};

export default Menu;
