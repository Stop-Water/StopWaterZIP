import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import GrayButton from '../Common/GrayButton';
import GrayLink from '../Common/GrayLink';

const StationHistory = ({
  currentHistory,
  checkedItem,
  stationHistory,
  historyPerPage,
  handlePageChange,
  currentPage,
  handleDeleteHistory,
  handleChecked,
}) => {
  return (
    <div className="adminContWrap">
      <h2 className="adminTit">· 관측소 이력정보</h2>
      <table className="adminHistory">
        <tbody>
          <tr>
            <th width="4%">선택</th>
            <th width="5%">번호</th>
            <th width="16%">작성일시</th>
            <th width="55%">작업내용</th>
            <th width="10%">작업자(ID)</th>
            <th width="10%">첨부파일</th>
          </tr>
          {currentHistory ? (
            currentHistory.map((history, index) => (
              <tr key={index}>
                <td>
                  <Checkbox
                    color="default"
                    inputProps={{
                      'aria-label': 'checkbox with default color',
                    }}
                    id={String(history.seq)}
                    onChange={handleChecked}
                    checked={
                      checkedItem.includes(String(history.seq)) ? true : false
                    }
                  />
                </td>
                <td>{history.index}</td>
                <td>{`${history.reg_datetime.substring(
                  0,
                  4,
                )}년 ${history.reg_datetime.substring(
                  4,
                  6,
                )}월 ${history.reg_datetime.substring(
                  6,
                  8,
                )}일 ${history.reg_datetime.substring(
                  8,
                  10,
                )}시 ${history.reg_datetime.substring(10, 12)}분`}</td>
                <td>{history.cont}</td>
                <td>{history.writer}</td>
                <td className="Attachments">
                  <a href={history.attach_link}>
                    {history.attach_name
                      ? history.attach_name.substring(13)
                      : ''}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      {stationHistory ? (
        <div className="TablePaging">
          <Pagination
            count={Math.ceil(stationHistory.length / historyPerPage)}
            shape="rounded"
            onChange={handlePageChange}
            page={parseInt(currentPage)}
          />
          <GrayLink to="#">
            <GrayButton variant="contained" onClick={handleDeleteHistory}>
              삭제
            </GrayButton>
          </GrayLink>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StationHistory;
