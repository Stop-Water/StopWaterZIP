import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HeaderWrap from './Components/Header/HeaderWrap';
import Menu from './Components/Menu/Menu';
import Footer from './Components/Footer/Footer';
import Login from './pages/LoginPage';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';

import './scss/common.scss';
import { useDispatch, useSelector } from 'react-redux';
import { check } from './modules/user';

const GisMonitoring = React.lazy(() => import('./pages/GisMonitoring'));
const Admin = React.lazy(() => import('./pages/AdminPage'));
const Dashboard = React.lazy(() => import('./pages/DashboardPage'));
const Statistics = React.lazy(() => import('./pages/StatisticsPage'));
const Modal = React.lazy(() => import('./pages/ModalPage'));
const Error = React.lazy(() => import('./pages/ErrorPage'));

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <HeaderWrap />
      <Menu />
      <Footer />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route path="/" component={Dashboard} exact={true} />
          <Route path="/gis" component={GisMonitoring} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route
            path={['/notFound', '*']}
            render={() => <Error flag="404" exact={true} />}
          ></Route>
        </Switch>
        <Modal />
      </Suspense>
      {isLoading && <LoadingPage />}

      {/* <ErrorPage /> */}
    </BrowserRouter>
  );
}

export default App;
