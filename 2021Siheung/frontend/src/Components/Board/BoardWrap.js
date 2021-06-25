import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import NoticeListWrap from './NoticeListWrap';
import NoticeWrite from './NoticeWrite';
import NoticeViewWrap from './NoticeViewWrap';
import NoticeEditWrap from './NoticeEditWrap';

const BoardWrap = () => {
  return (
    <div className="subContWrap">
      <div className="subContBGWrap boardBG">
        <div className="subContainer IntroWidth">
          <div className="subHead">
            <div className="subTitBox">
              <h1 className="subTit">
                <img src="/img/common/leftMenu04Over.png" alt="게시판 아이콘" />
                &nbsp; 공지사항
              </h1>
              <h4>
                <FontAwesomeIcon icon={faHome} color="#fff" /> &nbsp; HOME &#62;
                공지사항
              </h4>
            </div>
            {/*subTitBox*/}
          </div>
          <Switch>
            <Route
              path="/notice/list/:page"
              exact={true}
              component={NoticeListWrap}
            />
            <Route path="/notice/write" exact={true} component={NoticeWrite} />
            <Route
              path="/notice/edit/:postId"
              exact={true}
              component={NoticeEditWrap}
            />
            <Route
              path="/notice/view/:postId"
              exact={true}
              component={NoticeViewWrap}
            />
            <Route render={() => <Redirect to="/notFound" />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default BoardWrap;
