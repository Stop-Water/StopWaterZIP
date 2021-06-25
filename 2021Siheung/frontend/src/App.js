import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';

const Main = React.lazy(() => import('./Pages/Main'));
const DataInfoMain = React.lazy(() => import('./Pages/DataInfoMain'));
const Board = React.lazy(() => import('./Pages/Board'));
const Info = React.lazy(() => import('./Pages/Info'));
const Login = React.lazy(() => import('./Pages/LoginPage'));
const Admin = React.lazy(() => import('./Pages/Admin'));
const Header = React.lazy(() => import('./Components/Header/Header'));
const Visensor = React.lazy(() => import('./Pages/VisensorPage'));
const MBHeader = React.lazy(() => import('./Components/Header/MBHeader'));
const NotFound = React.lazy(() => import('./Pages/NotFound'));
const CopyrightM = React.lazy(() => import('./Pages/CopyrightM'));
const PrivacyM = React.lazy(() => import('./Pages/PrivacyPolicyM'));
const EmailM = React.lazy(() => import('./Pages/RejectionEmailM'));
const airKorea = React.lazy(() => import('./Components/Airkorea/AirKoreaWarp'));

require('bootstrap');

document.cookie = 'corssCookie=Shiheung; SameSite=None; Secure';

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact={true}>
          <Redirect to="/siheung/" />
        </Route>
      </Router>
      <Router basename="/siheung">
        <Suspense fallback={<></>}>
          <Header />
          <MBHeader />
          <Switch>
            <Route component={Main} path="/" exact={true}></Route>
            <Route component={DataInfoMain} path="/dataInfo"></Route>
            <Route component={Info} path="/info"></Route>
            <Route component={Board} path="/notice"></Route>
            <Route component={Login} path="/login"></Route>
            <Route component={Admin} path="/admin"></Route>
            <Route component={CopyrightM} path="/copyrightm"></Route>
            <Route component={PrivacyM} path="/privacym"></Route>
            <Route component={EmailM} path="/emailm"></Route>
            <Route component={airKorea} path="/airKorea"></Route>
            <Route component={Visensor} path="/fogSensor"></Route>
            <Route component={NotFound} path={['/notFound', '*']}></Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
