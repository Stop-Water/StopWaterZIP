import React, { useRef, useState } from 'react';
import axios from 'axios';
import GrayButton from '../Common/GrayButton';
import GrayLink from '../Common/GrayLink';
import BlueBtn from '../Common/BuleButtons';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';

const BlueButton = BlueBtn.nonmargin;

const NoticeEdit = ({ history, post }) => {
  const editorRef = useRef();
  const subjectRef = useRef();
  const fileRef = useRef();
  const fileNameRef = useRef();
  const delBtnRef = useRef();
  const [fileDeleted, setFileDeleted] = useState(false);
  let filteredFileName = '';
  if (post && post.attach_name)
    filteredFileName = post.attach_name.substring(13);

  const handleSave = () => {
    const conf = window.confirm('게시물을 수정하시겠습니까?');
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
              handleEdit(fileName, fileDownUri);
            })
            .catch((error) => {
              console.log(error);
            });
        };

        uploadFile(form);
      } else {
        if (fileDeleted) {
          const filename = '';
          const fileDownUri = '';
          handleEdit(filename, fileDownUri);
        } else {
          const filename = post.attach_name;
          const fileDownUri = post.attach_link;
          handleEdit(filename, fileDownUri);
        }
      }
    }
  };

  const handleEdit = (fileName, fileDownUri) => {
    const reqBody = {
      id: post.id,
      title: subjectRef.current.value,
      cont: editorRef.current.getInstance().getHtml(),
      attachName: fileName,
      attachLink: fileDownUri,
    };

    const jsonReq = JSON.stringify(reqBody);

    const update = async (jsonReq) => {
      const URL = '/api/update';

      await axios
        .post(URL, jsonReq, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(() => {
          alert('게시물이 수정되었습니다.');
          history.push(`/notice/view/${post.id}`);
          history.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    update(jsonReq);
  };

  const handleFileChange = () => {
    if (post.attach_name) {
      const conf = window.confirm(
        '현재 첨부 파일을 변경하시겠습니까? 기존의 파일은 삭제됩니다.',
      );
      if (conf) {
        fileNameRef.current.style.textDecoration = 'line-through';
        fileNameRef.current.style.color = 'gray';
        delBtnRef.current.style.visibility = 'hidden';
        setFileDeleted(true);
      }
    }
  };

  const handleFileDelete = () => {
    const conf = window.confirm('현재 첨부 파일을 삭제하시겠습니까?');
    if (conf) {
      fileNameRef.current.style.textDecoration = 'line-through';
      fileNameRef.current.style.color = 'gray';
      delBtnRef.current.style.visibility = 'hidden';
      setFileDeleted(true);
    }
  };

  const checkSpecial = () => {
    const special = /[{}[\]/?,;:|)*~`!^\-_+<>@#$%&\\='"]/gi;
    const fileValue = fileRef.current.value.split('\\');
    const fileName = fileValue[fileValue.length - 1];
    if (special.test(fileName) === true) {
      alert('파일 이름에는 특수문자가 들어갈 수 없습니다.');
      fileRef.current.value = null;
    } else {
      handleFileChange();
    }
  };

  if (!post) return null;
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
                defaultValue={post.title}
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
                  initialValue={post.cont}
                />
              </div>
            </div>
          </div>
          <div className="columRow">
            <div className="th">첨부파일</div>
            <div>
              {post.attach_name ? (
                <>
                  <span>
                    현재 첨부파일 :
                    <span ref={fileNameRef}>{filteredFileName}</span>
                  </span>
                  <button ref={delBtnRef} onClick={handleFileDelete}>
                    X
                  </button>
                  <br></br>
                </>
              ) : (
                <></>
              )}
              <input
                type="file"
                className="BoardTextInput"
                ref={fileRef}
                onChange={checkSpecial}
              ></input>
            </div>
          </div>
        </div>
        {/*<table>
          <tbody>
            <tr>
              <th width="15%">제목</th>
              <td colSpan="3">
                <input
                  type="text"
                  className="BoardTextInput"
                  ref={subjectRef}
                  defaultValue={post.title}
                ></input>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td colSpan="3" className="">
                <Editor
                  height="500px"
                  initialEditType="wysiwyg"
                  ref={editorRef}
                  plugins={[colorSyntaxPlugin]}
                  initialValue={post.cont}
                />
              </td>
            </tr>

            <tr>
              <th width="15%">첨부파일</th>
              <td colSpan="3">
                {post.attach_name ? (
                  <>
                    <span>
                      현재 첨부파일 :
                      <span ref={fileNameRef}>{filteredFileName}</span>
                    </span>
                    <button ref={delBtnRef} onClick={handleFileDelete}>
                      X
                    </button>
                    <br></br>
                  </>
                ) : (
                  <></>
                )}
                <input
                  type="file"
                  className="BoardTextInput"
                  ref={fileRef}
                  onChange={checkSpecial}
                ></input>
              </td>
            </tr>
          </tbody>
                </table>*/}
      </div>
      <div className="multiBTN">
        <GrayLink to={`/notice/view/${post.id}`}>
          <GrayButton variant="contained">취소</GrayButton>
        </GrayLink>
        <BlueButton variant="contained" onClick={handleSave}>
          저장
        </BlueButton>
      </div>
    </div>
  );
};

export default NoticeEdit;
