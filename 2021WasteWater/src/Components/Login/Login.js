import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../modules/auth';
import { check } from '../../modules/user';

import TextField from '@material-ui/core/TextField';
import './scss/Login.scss';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const idRef = useRef();
  const pwRef = useRef();
  const [loginError, setLoginError] = useState(false);
  const { auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const handleLogin = (e) => {
    e.preventDefault();

    const username = idRef.current.value;
    const password = pwRef.current.value;

    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (authError) {
      setLoginError(true);
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', user);
      } catch (e) {
        console.log('localStorage error');
        console.log(e);
      }
    }
  }, [history, user]);

  return (
    <div className="loginWrap">
      <div className="loginLogo">
        <svg className="logoBig" viewBox="0 0 63.486 65.563">
          <g transform="translate(0 0)">
            <path
              d="M740.922,335.331A13.059,13.059,0,0,1,727.9,323.186H723.61a17.371,17.371,0,0,0,34.69,0h-4.293A13.112,13.112,0,0,1,740.922,335.331Z"
              transform="translate(-709.214 -288.476)"
              fill="#48affb"
            />
            <path
              d="M744.539,342.98a20.735,20.735,0,0,1-20.677-19.794h-4.271a25.01,25.01,0,0,0,24.934,24.066h.027a25.012,25.012,0,0,0,24.932-24.066h-4.272A20.731,20.731,0,0,1,744.539,342.98Z"
              transform="translate(-712.794 -288.476)"
              fill="#48affb"
            />
            <path
              d="M747.74,349.769a27.6,27.6,0,0,1-27.47-26.583H716A31.871,31.871,0,0,0,747.67,354.04h.142a31.87,31.87,0,0,0,31.671-30.854h-4.271A27.6,27.6,0,0,1,747.74,349.769Z"
              transform="translate(-715.998 -288.476)"
              fill="#48affb"
            />
            <path
              d="M758.6,334.073h4.282a31.886,31.886,0,0,0-28.341-29.241v4.306A27.61,27.61,0,0,1,758.6,334.073Z"
              transform="translate(-699.471 -304.832)"
              fill="#48affb"
            />
            <path
              d="M743.612,309.181v-4.3a31.822,31.822,0,0,0-27.575,29.157h4.284A27.557,27.557,0,0,1,743.612,309.181Z"
              transform="translate(-715.962 -304.793)"
              fill="#48affb"
            />
            <path
              d="M737.726,311.47a.442.442,0,0,0-.609.142c-1.825,2.9-9.7,15.726-9.7,20.832-.008.231-.008.46,0,.688a10.079,10.079,0,0,0,20.146-.688c0-5.114-7.873-17.925-9.7-20.832A.441.441,0,0,0,737.726,311.47Z"
              transform="translate(-705.823 -298.978)"
              fill="#ffca23"
            />
          </g>
        </svg>
        <div className="loginTitle">
          Iot 기반 하수관망용<br></br>다중센서 허브 시스템
        </div>
      </div>
      <div className="loginBoxWrap">
        <form className="loginBox loginBoxId">
          <TextField
            className="idBox"
            id="id"
            label="아이디"
            variant="outlined"
            inputRef={idRef}
          />
        </form>
        <form className="loginBox loginBoxPassword" onSubmit={handleLogin}>
          <TextField
            className="idBox"
            id="password"
            label="패스워드"
            variant="outlined"
            inputRef={pwRef}
            inputProps={{ type: 'password' }}
          />
        </form>
        {loginError && <div>아이디 또는 패스워드를 확인하세요.</div>}
        <form className="loginBox">
          <button className="loginBtn" onClick={handleLogin}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
