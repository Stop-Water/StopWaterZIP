import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../modules/auth';
import { check } from '../../modules/user';
import './Login.css';

const Login = ({ history }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const { auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onsubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (authError) {
      setError(true);
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/admin');
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
      <div className="loginBox">
        <h3>관리자 로그인</h3>
        <div className="loginIMG">
          <img src="/img/common/loginIMG.png" alt="로그인 이미지" />
        </div>

        <form>
          <div className="IDPW">
            <p>아이디</p>
            <input type="text" ref={usernameRef}></input>
          </div>
          <div className="IDPW">
            <p>비밀번호</p>
            <input type="password" ref={passwordRef}></input>
          </div>
          <div>
            <input
              type="Submit"
              defaultValue="로그인"
              onClick={onsubmit}
              className="loginBtn"
            />
          </div>
          {error && submit ? (
            <div>
              <p className="errorSpan">* 아이디 또는 비밀번호를 확인하세요.</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
