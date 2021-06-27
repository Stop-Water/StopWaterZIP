import React from 'react';
import { withRouter } from 'react-router';
import './scss/Error.scss';

const Error = ({ icon, title, content, history }) => {
  const handleGoHome = () => {
    history.push('/');
  };

  return (
    <div className="errorWrap">
      <div className="errorContainer">
        <div className="errorIcon">{icon}</div>
        <div className="errorTextBox">
          <div className="errorTitle">{title}</div>
          <div className="errorText">{content}</div>
          <div className="errorBtn" onClick={handleGoHome}>
            메인으로 바로가기
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Error);
