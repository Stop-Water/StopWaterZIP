import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateMenu, updateAdminMenu } from '../../modules/menu';
import { resetSelectedStation } from '../../modules/common';
import Header from './Header';
import Notice from './Notice';

function HeaderWrap({ location }) {
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const dispatch = useDispatch();

  const handleNotiToggle = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  useEffect(() => {
    const curretPath = location.pathname;

    if (curretPath === '/gis') {
      dispatch(updateMenu('gis'));
    } else if (curretPath === '/statistics') {
      dispatch(updateMenu('statistics'));
    } else if (curretPath === '/admin' || curretPath === '/admin/place') {
      dispatch(updateMenu('admin'));
      dispatch(updateAdminMenu('place'));
    } else if (curretPath === '/admin/data') {
      dispatch(updateMenu('admin'));
      dispatch(updateAdminMenu('data'));
    } else if (curretPath === '/admin/user') {
      dispatch(updateMenu('admin'));
      dispatch(updateAdminMenu('user'));
    } else {
      dispatch(updateMenu('dashboard'));
    }

    dispatch(resetSelectedStation());
  }, [dispatch, location.pathname]);

  return (
    <>
      <Header handleNotiToggle={handleNotiToggle} />
      {isNotiOpen && <Notice handleNotiToggle={handleNotiToggle} />}
    </>
  );
}

export default withRouter(HeaderWrap);
