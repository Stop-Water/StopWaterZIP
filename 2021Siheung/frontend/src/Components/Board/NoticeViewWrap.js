import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoticeView from './NoticeView';
import { Redirect } from 'react-router-dom';

const NoticeViewWrap = ({ match, history }) => {
  const { postId } = match.params;
  const [post, setPost] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const cancleToken = axios.CancelToken.source();

    const getNotice = async () => {
      const URL = `/api/select/${postId}`;

      await axios
        .get(URL, {
          cancelToken: cancleToken.token,
        })
        .then((response) => {
          modifyData(response.data);
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
  }, [postId]);

  const modifyData = (data) => {
    data.reg_date = `${data.reg_date.substring(
      0,
      4,
    )}년 ${data.reg_date.substring(5, 7)}월 ${data.reg_date.substring(
      8,
      10,
    )}일`;

    setPost(data);
  };

  if (!post && !error) return null;
  if (error) return <Redirect to="/notFound" />;
  return <NoticeView data={post} history={history} />;
};

export default NoticeViewWrap;
