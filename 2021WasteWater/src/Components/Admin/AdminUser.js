import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import SubTitle from '../Common/SubTitle';
import SearchBar from '../Common/SearchBar';
import TableWrap from '../Common/Table/TableWrap';

import * as adminAPI from '../../lib/api/admin';
import { updateUserGroup } from '../../modules/admin';

const AdminUser = () => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.admin.selectedUserGroup);
  const [userData, setUserData] = useState();

  const getUserGroup = useCallback(() => {
    adminAPI
      .selectUserGroup()
      .then((response) => {
        dispatch(updateUserGroup(response.data.data));
      })
      .catch((e) => {
        console.error('selectUserGroup error');
        console.error(e);
      });
  }, [dispatch]);

  const getUserData = useCallback((cancleToken, group) => {
    adminAPI
      .selectUserData(cancleToken, group === 'all' ? null : group)
      .then((response) => {
        response.data.data &&
          response.data.data.forEach((element) => {
            element.logDt = moment(element.logDt).format('YYYY년 MM월 DD일');
          });
        setUserData(response.data.data);
      })
      .catch((e) => {
        console.error('selectUserData error');
        console.error(e);
      });
  }, []);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    getUserGroup(cancelToken.token);
    getUserData(cancelToken.token, selectedGroup);
    getUserGroup(cancelToken.token);
  }, [getUserGroup, getUserData, selectedGroup]);

  if (!userData) return null;
  return (
    <div className="admin3Wrap">
      <SubTitle title="사용자 관리" />
      <SearchBar flag="user" />
      {/* <div className="smallTitle">
        <div className="resultTitle">사용자 목록</div>
        <svg className="deleteIcon" viewBox="0 0 18.141 20.732">
          <path
            d="M17.493,1.3H12.634L12.253.538A.972.972,0,0,0,11.383,0H6.754a.96.96,0,0,0-.867.539L5.507,1.3H.648A.648.648,0,0,0,0,1.943v1.3a.648.648,0,0,0,.648.648H17.493a.648.648,0,0,0,.648-.648v-1.3A.648.648,0,0,0,17.493,1.3ZM2.154,18.91a1.944,1.944,0,0,0,1.94,1.822h9.953a1.944,1.944,0,0,0,1.94-1.822l.858-13.727H1.3Z"
            transform="translate(0 0)"
          />
        </svg>
      </div> */}
      <TableWrap data={userData} flag="user" />
      {/*    <div className="smallTitle">
        <div className="resultTitle">관리자 신규 등록</div>
        <div className="rigthIcon">
          <svg className="modifyIcon" viewBox="0 0 19.363 20.541">
            <path
              id="pen-solid"
              d="M10.985,3.748l4.841,5.136L5.313,20.037,1,20.542a.936.936,0,0,1-1-1.064L.475,14.9Zm7.836-.765L16.547.572a1.743,1.743,0,0,0-2.568,0L11.841,2.84l4.841,5.136,2.139-2.269a2.011,2.011,0,0,0,0-2.724Z"
              transform="translate(0.011 -0.008)"
            />
          </svg>
          <svg className="saveIcon" viewBox="0 0 21.259 21.259">
            <path
              id="save-solid"
              d="M20.592,36.648l-3.98-3.98A2.278,2.278,0,0,0,15,32H2.278A2.278,2.278,0,0,0,0,34.278v16.7a2.278,2.278,0,0,0,2.278,2.278h16.7a2.278,2.278,0,0,0,2.278-2.278V38.258a2.278,2.278,0,0,0-.667-1.611ZM10.629,50.222a3.037,3.037,0,1,1,3.037-3.037A3.037,3.037,0,0,1,10.629,50.222Zm4.555-14.45v4.77a.569.569,0,0,1-.569.569H3.606a.569.569,0,0,1-.569-.569V35.606a.569.569,0,0,1,.569-.569H14.45a.569.569,0,0,1,.4.167l.165.165a.569.569,0,0,1,.167.4Z"
              transform="translate(0 -32)"
            />
          </svg>
        </div>
      </div>
      <div className="tableBox2">
        <TableBox2 />
      </div> */}
    </div>
  );
};

export default AdminUser;
