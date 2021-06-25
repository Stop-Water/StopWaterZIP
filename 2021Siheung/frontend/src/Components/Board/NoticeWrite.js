import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import GrayButton from '../Common/GrayButton';
import GrayLink from '../Common/GrayLink';
import BlueBtn from '../Common/BuleButtons';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from 'react-redux';
import { check } from '../../modules/user';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';

const BlueButton = BlueBtn.nonmargin;

const NoticeWrite = ({ history }) => {
  const editorRef = useRef();
  const subjectRef = useRef();
  const fileRef = useRef();

  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const handleSave = () => {
    if (!subjectRef.current.value) {
      alert('제목을 입력해주세요');
    } else {
      const conf = window.confirm('게시물을 등록하시겠습니까?');
      if (conf) {
        if (fileRef.current.files[0]) {
          const form = new FormData();
          form.append('file', fileRef.current.files[0]);

          const uploadFile = async (form) => {
            const URL = '/uploadfile/board';

            await axios
              .post(URL, form)
              .then((response) => {
                const fileName = response.data.fileName;
                const fileDownUri = response.data.fileDownloadUri;
                handleWrite(fileName, fileDownUri);
              })
              .catch((error) => {
                console.log(error);
              });
          };

          uploadFile(form);
        } else {
          const filename = '';
          const fileDownUri = '';
          handleWrite(filename, fileDownUri);
        }
      }
    }
  };

  const handleWrite = (fileName, fileDownUri) => {
    const reqBody = {
      title: subjectRef.current.value,
      cont: editorRef.current.getInstance().getHtml(),
      attachName: fileName,
      attachLink: fileDownUri,
    };

    const jsonReq = JSON.stringify(reqBody);

    const write = async (jsonReq) => {
      const URL = '/api/insert';

      await axios
        .post(URL, jsonReq, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(() => {
          alert('게시물이 등록되었습니다.');
          history.push('/notice/list/1');
          history.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    write(jsonReq);
  };

  const checkSpecial = () => {
    const special = /[{}[\]/?,;:|)*~`!^\-_+<>@#$%&\\=('"]/gi;
    const fileValue = fileRef.current.value.split('\\');
    const fileName = fileValue[fileValue.length - 1];
    if (special.test(fileName) === true) {
      alert('파일 이름에는 특수문자가 들어갈 수 없습니다.');
      fileRef.current.value = null;
    }
  };

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  if (!user) return null;
  return (
    <div className="subContBox">
      <div className="rightTableBox noticeBoard Write">
        <div className="tableLayout">
          <div className="columRow">
            <div className="th">제목</div>
            <div>
              <input
                type="text"
                className="BoardTextInput"
                ref={subjectRef}
              ></input>
            </div>
          </div>
          <div className="columRow">
            <div className="th">내용</div>
            <div>
              <div className="TableEditorContents">
                <Editor
                  height="500px"
                  initialEditType="wysiwyg"
                  ref={editorRef}
                  plugins={[colorSyntaxPlugin]}
                  language="ko-KR"
                  previewStyle="vertical"
                />
              </div>
            </div>
          </div>
          <div className="columRow">
            <div className="th">첨부파일</div>
            <div>
              <input
                type="file"
                className="BoardTextInput"
                ref={fileRef}
                onChange={checkSpecial}
              ></input>
            </div>
          </div>
        </div>
        {/* <table>
          <tbody>
            <tr>
              <th width="15%">제목</th>
              <td colSpan="3">
                <input
                  type="text"
                  className="BoardTextInput"
                  ref={subjectRef}
                ></input>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <div
                colSpan="3"
                className="TableEditorContents"
                style={{ display: 'block' }}
              >
                <Editor
                  height="500px"
                  initialEditType="wysiwyg"
                  ref={editorRef}
                  plugins={[colorSyntaxPlugin]}
                  language="ko-KR"
                  previewStyle="vertical"
                />
              </div>
            </tr>
            <tr>
              <th width="15%">첨부파일</th>
              <td colSpan="3">
                <input
                  type="file"
                  className="BoardTextInput"
                  ref={fileRef}
                  onChange={checkSpecial}
                ></input>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
      <div className="multiBTN">
        <GrayLink to="/notice/list/1">
          <GrayButton variant="contained">취소</GrayButton>
        </GrayLink>
        <BlueButton variant="contained" onClick={handleSave}>
          저장
        </BlueButton>
      </div>
    </div>
  );
};

export default NoticeWrite;
