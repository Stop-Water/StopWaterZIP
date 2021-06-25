import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import BlueLink from '../Common/BlueLink';
import BlueBtn from '../Common/BuleButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BlueButton = BlueBtn.default;

const NoticeList = ({
  data,
  postsPerPage,
  totalPosts,
  handleChange,
  currentPage,
}) => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  if (!data) return null;
  return (
    <div className="subContBox">
      <div className="rightTableBox noticeBoard">
        <table>
          <thead>
            <tr>
              <td width="10%">번호</td>
              <td width="65%">제목</td>
              <td width="10%">첨부</td>
              <td width="15%">등록일</td>
            </tr>
          </thead>
          <tbody>
            {data.map((posts) => (
              <tr key={posts.id}>
                <td>{posts.pageNum}</td>
                <td className="text-left">
                  <Link to={`/notice/view/${posts.id}`}>{posts.title}</Link>
                </td>
                <td>
                  {posts.attach_link ? (
                    <FontAwesomeIcon icon={faSave} />
                  ) : (
                    <></>
                  )}
                </td>
                <td className="date">{posts.reg_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="TablePaging">
        <Pagination
          count={Math.ceil(totalPosts / postsPerPage)}
          shape="rounded"
          onChange={handleChange}
          page={parseInt(currentPage)}
          showFirstButton={true}
          showLastButton={true}
        />
        {user ? (
          <BlueLink to="/notice/write">
            <BlueButton variant="contained">글쓰기</BlueButton>
          </BlueLink>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
