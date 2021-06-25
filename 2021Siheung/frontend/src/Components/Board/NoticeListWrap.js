import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import NoticeList from './NoticeList';

const NoticeListWrap = ({ history, match }) => {
  const { page } = match.params;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [error, setError] = useState(false);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    if (isNaN(page)) setError(true);
    const cancleToken = axios.CancelToken.source();

    const getNoticeList = async () => {
      const URL = '/api/selectlist';

      await axios
        .get(URL, {
          cancelToken: cancleToken.token,
        })
        .then((response) => {
          modifyData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getNoticeList();

    return () => {
      cancleToken.cancel();
    };
  }, [page]);

  const handleChange = (e, page) => {
    setCurrentPage(page);
    history.push(`/notice/list/${page}`);
  };

  const modifyData = (data) => {
    data.forEach((element, index) => {
      element.reg_date = `${element.reg_date.substring(
        0,
        4,
      )}년 ${element.reg_date.substring(5, 7)}월 ${element.reg_date.substring(
        8,
        10,
      )}일`;
      element.pageNum = index + 1;
    });

    setPosts(data.reverse());
  };

  if (!posts) return null;
  if (
    (page > Math.ceil(posts.length / postsPerPage) && page !== '1') ||
    error
  ) {
    return <Redirect to="/notFound" />;
  } else {
    return (
      <div>
        <Route
          path={['/notice/list/:page']}
          exact={true}
          render={() => (
            <NoticeList
              data={currentPosts}
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              handleChange={handleChange}
              currentPage={currentPage}
            />
          )}
        />
      </div>
    );
  }
};

export default NoticeListWrap;
