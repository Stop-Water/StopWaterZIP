import React from 'react';
import axios from 'axios';
import GrayButton from '../Common/GrayButton';
import BlueBtn from '../Common/BuleButtons';
import BlueLink from '../Common/BlueLink';
import { useSelector } from 'react-redux';
import { Viewer } from '@toast-ui/react-editor';

const BlueButton = BlueBtn.default;

const NoticeView = ({ data, history }) => {
  let filteredFileName = '';
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  if (data.attach_name) filteredFileName = data.attach_name.substring(13);

  const handleDelete = () => {
    const conf = window.confirm('게시물을 삭제하시겠습니까?');
    if (conf) {
      const deleteNotice = async () => {
        const URL = `/api/delete/${data.id}`;

        await axios
          .post(URL)
          .then(() => {
            alert('게시물이 삭제되었습니다.');
            history.push('/notice/list/1');
            history.go(0);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      deleteNotice();
    }
  };

  if (!data) return null;
  return (
    <div className="subContBox">
      <div className="rightTableBox noticeBoard Write">
        <table>
          <tbody>
            <tr>
              <th width="15%">제목</th>
              <td colSpan="3">{data.title}</td>
            </tr>
            <tr>
              <th>등록일</th>
              <td>{data.reg_date}</td>
              <th>작성자</th>
              <td>관리자</td>
            </tr>
            {data.attach_name ? (
              <tr>
                <th>첨부파일</th>
                <td colSpan="3">
                  <a href={`${data.attach_link}`}>{filteredFileName}</a>
                </td>
              </tr>
            ) : (
              <></>
            )}
            <tr>
              <th>내용</th>
              <td colSpan="3" className="BoardTextArea">
                <Viewer initialValue={data.cont} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="multiBTN">
        {user ? (
          <>
            <GrayButton onClick={handleDelete}>삭제</GrayButton>
            <BlueLink to={`/notice/edit/${data.id}`}>
              <BlueButton variant="contained">수정</BlueButton>
            </BlueLink>
          </>
        ) : (
          <></>
        )}

        <BlueLink to="/notice/list/1">
          <BlueButton variant="contained">목록</BlueButton>
        </BlueLink>
      </div>
    </div>
  );
};

export default NoticeView;
