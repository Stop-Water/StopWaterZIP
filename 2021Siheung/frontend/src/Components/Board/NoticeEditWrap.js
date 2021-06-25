import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoticeEdit from './NoticeEdit';
import { check } from '../../modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const NoticeEditWrap = ({ history, match }) => {
  const { postId } = match.params;
  const [post, setPost] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const checkNull = (data) => {
    data.reg_date = data.reg_date = `${data.reg_date.substring(
      0,
      4,
    )}년 ${data.reg_date.substring(5, 7)}월 ${data.reg_date.substring(
      8,
      10,
    )}일`;
    setPost(data);
  };

  useEffect(() => {
    dispatch(check());
    const cancleToken = axios.CancelToken.source();

    const getNotice = async () => {
      const URL = `/api/select/${postId}`;

      await axios
        .get(URL, {
          cancelToken: cancleToken.token,
        })
        .then((response) => {
          checkNull(response.data);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    };

    getNotice();
    return () => {
      cancleToken.cancel();
    };
  }, [postId, dispatch]);

  if (!user || (!post && !error)) return null;
  if (error) {
    return <Redirect to="/notFound" />;
  } else return <NoticeEdit history={history} post={post} />;
};

export default NoticeEditWrap;
