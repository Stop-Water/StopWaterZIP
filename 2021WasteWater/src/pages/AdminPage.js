import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import LoadingPage from './LoadingPage';
import AdminData from '../Components/Admin/AdminData';
import AdminUser from '../Components/Admin/AdminUser';

import '../Components/Admin/scss/AdminPage.scss';

const AdminPlace = React.lazy(() => import('../Components/Admin/AdminPlace'));

const AdminPage = () => {
  return (
    <div className="adminPage">
      <Suspense fallback={<LoadingPage />}>
        <Route path="/admin" exact={true}>
          <Redirect to="/admin/place" />
        </Route>
        <Route component={AdminPlace} path="/admin/place"></Route>
        <Route component={AdminData} path="/admin/data"></Route>
        <Route component={AdminUser} path="/admin/user"></Route>
      </Suspense>
    </div>
  );
};

export default AdminPage;
