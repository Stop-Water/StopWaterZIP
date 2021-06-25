import React from 'react';
import BlueBtn from '../Common/BuleButtons';

const BlueButton = BlueBtn.default;

const WriteHistory = ({
  historyWriterRef,
  historyContRef,
  historyfileRef,
  checkSpecial,
  fileName,
  delBtnRef,
  handleCancleAttach,
  handleWriteHistory,
}) => {
  return (
    <div className="adminContWrap">
      <h2 className="adminTit">· 작업 이력작성</h2>
      <div className="adminTableGrid">
        <table>
          <tbody>
            <tr>
              <th className="worker">작업자</th>
              <td>
                <input type="text" ref={historyWriterRef} />
              </td>
              <th rowSpan="2" className="worker">
                작업내용
              </th>
              <td rowSpan="2">
                <textarea className="textarea" ref={historyContRef}></textarea>
              </td>
            </tr>
            <tr>
              <th className="worker">첨부파일</th>
              <td>
                <input
                  type="file"
                  ref={historyfileRef}
                  onChange={checkSpecial}
                ></input>
                {fileName ? (
                  <button
                    className="uploadRemove"
                    ref={delBtnRef}
                    onClick={handleCancleAttach}
                  >
                    삭제
                  </button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="searchArea mt-4">
        <BlueButton onClick={handleWriteHistory}>등록</BlueButton>
      </div>
    </div>
  );
};

export default WriteHistory;
