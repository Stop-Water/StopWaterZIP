import React from 'react';
import { Table, Column } from 'react-virtualized';
import { Scrollbars } from 'react-custom-scrollbars-2';

import '../scss/TableBox1.scss';
import '../scss/BoxFrame.scss';

const DATA_FLAG = {
  flux: ['date', 'srfcSpfld', 'innrSpfld', 'flux', 'wal', 'amnRt', 'qltwtr'],
  fluxFlag: [
    '시간',
    '표면유속(m/s)',
    '내부유속(m/s)',
    <span>
      유량(m³/s)
    </span>,
    '수위(cm)',
    '퇴적율(%)',
    '수질(TOC)(mg/l)',
  ],
  fluxTB: ['date', 'inSpeed', 'outSpeed', 'flux', 'waterlv', 'deposition'],
  fluxTBFlag: [
    '시간',
    '표면유속(m/s)',
    '내부유속(m/s)',
    <span>
      유량(m³/s)
    </span>,
    '수위(cm)',
    '퇴적율(%)',
  ],
  foulOder: ['date', 'nh3', 'co', 'h2s', 'toluene'],
  foulOderFlag: [
    '시간',
    <span>
      NH₃(ppm)
    </span>,
    'CO(ppm)',
    <span>
      H₂S(ppm)
    </span>,
    'Toluene(ppm)',
  ],
  qualityTB: ['date', 'quality'],
  qualityTBFlag: ['시간', '수질(TOC)(mg/l)'],
  foulOderTB: ['date', 'nh3', 'co', 'h2s', 'tol'],
  sensor: ['oprtDt', 'oprtCn', 'oprtNm', 'snsrSnAftch', 'oprtSttsNm', 'fileNm'],
  sensorFlag: [
    '교체일시',
    '작업내용',
    '작업자',
    '작업 후 ID',
    '상태',
    '첨부파일',
  ],
  user: ['userNm', 'userId', 'cdDc', 'telno', 'logCnt', 'logDt'],
  userFlag: [
    '이름',
    '아이디',
    '소속',
    '전화번호',
    '누적접속횟수',
    '최종접속일',
  ],
  adminData: ['knd', 'dataNm', 'dataValue', 'date', 'DTime'],
  adminDataFlag: ['종류', '항목', '데이터', '발생일', '발생시간'],
};

const TableBox = ({ data, flag }) => {

  let dataFlag;
  let dataLegend;

  if (flag === 'flux') {
    dataFlag = DATA_FLAG.flux;
    dataLegend = DATA_FLAG.fluxFlag;
  } else if (flag === 'fluxTB') {
    dataFlag = DATA_FLAG.fluxTB;
    dataLegend = DATA_FLAG.fluxTBFlag;
  } else if (flag === 'qualityTB') {
    dataFlag = DATA_FLAG.qualityTB;
    dataLegend = DATA_FLAG.qualityTBFlag;
  } else if (flag === 'foulOderTB') {
    dataFlag = DATA_FLAG.foulOderTB;
    dataLegend = DATA_FLAG.foulOderFlag;
  } else if (flag === 'foulOder') {
    dataFlag = DATA_FLAG.foulOder;
    dataLegend = DATA_FLAG.foulOderFlag;
  } else if (flag === 'sensor') {
    dataFlag = DATA_FLAG.sensor;
    dataLegend = DATA_FLAG.sensorFlag;
  } else if (flag === 'user') {
    dataFlag = DATA_FLAG.user;
    dataLegend = DATA_FLAG.userFlag;
  } else {
    dataFlag = DATA_FLAG.adminData;
    dataLegend = DATA_FLAG.adminDataFlag;
  }

  if (!data) return null;
  return (
    <div className="tableBox1Wrap boxFrame">
      <div className="frameLine"></div>
      <Scrollbars
        className="dataWrap"
        thumbMinSize={30}
        universal={true}

        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
      >
        <div className="dataTable dataTop">
          <div className="tableTop">
            <div className="tableRow">
              {/*  <div className="tableCell checkBox">
                <input type="checkbox" id="tableCheck1"></input>
                <label htmlFor="tableCheck1"></label>
              </div> */}
              {dataLegend.map((item, index) => (
                <div className="tableCell" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Table
          className="dataTable"
          gridClassName="tableContents"
          rowClassName="tableRow"
          disableHeader={true}
          headerHeight={55}
          width={100}
          height={35 * data.length}
          rowHeight={35}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
        >
          {dataFlag.map((item, index) => {
            if (item === 'fileNm')
              return (
                <Column
                  // className={item === 'date' ? 'tableCell' : 'tableCell'}
                  // 시간표현이 짧아져서 우선 빼두었습니다.
                  className={'tableCell'}
                  dataKey={item}
                  key={index}
                  width={1200}
                  cellRenderer={function ({
                    cellData,
                    columnData,
                    columnIndex,
                    dataKey,
                    isScrolling,
                    rowData,
                    rowIndex,
                  }) {
                    return (
                      <a
                        id={rowData.fileId}
                        href={`http://ecoflagdev.iptime.org:9093/waste/file-download/${rowData.fileId}`}
                      >
                        {cellData}
                      </a>
                    );
                  }}
                />
              );
            else
              return (
                <Column
                  // className={item === 'date' ? 'tableCell' : 'tableCell'}
                  // 시간표현이 짧아져서 우선 빼두었습니다.
                  className={'tableCell'}
                  dataKey={item}
                  key={index}
                  width={1200}
                />
              );
          })}
        </Table>
      </Scrollbars>
    </div>
  );
};

export default TableBox;
