import React from 'react';
import AdminTableItem from './AdminTableItem';
import '../scss/TableBox2.scss';
import '../scss/BoxFrame.scss';

const AdminTableWrap = ({ data, flag, reff }) => {
  const checkSpecial = () => {
    const special = /[{}[\]/?,;:|)*~`!^\-_+_<>@#$%&\\=('"]/gi;
    const fileValue = reff.file.current.value.split('\\');
    const fileName = fileValue[fileValue.length - 1];
    if (special.test(fileName) === true) {
      alert('파일 이름에는 특수문자가 들어갈 수 없습니다.');
      reff.file.current.value = null;
    } else {
      reff.fileNm.current.innerText = fileName;
    }
  };

  const STATION_INFO_LEFT = [
    {
      title: '측정소명',
      value: flag === 'station' && data && data.obsrvtNm,
      modifiable: false,
    },
    {
      title: '관리자',
      value: flag === 'station' && data && data.userNm,
      modifiable: false,
    },
    {
      title: '연락처',
      value: flag === 'station' && data && `${data.telno} / ${data.moblphon}`,
      modifiable: false,
    },
    {
      title: '설치일',
      value: flag === 'station' && data && data.instlDt,
      modifiable: false,
    },
    {
      title: '유관기관 / 담당자',
      value: flag === 'station' && data && data.userNm,
      modifiable: false,
    },
  ];

  const STATION_INFO_RIGHT = [
    {
      title: '설치상세위치',
      value: flag === 'station' && data && data.dtlLc,
      modifiable: false,
    },
    {
      title: '설치장소',
      value: flag === 'station' && data && data.dtlLc,
      modifiable: false,
    },
    {
      title: '경고수신자 1',
      value: flag === 'station' && data && data.email,
      modifiable: false,
    },
    {
      title: '경고수신자 2',
      value: flag === 'station' && data && data.email,
      modifiable: false,
    },
    {
      title: '경고수신자 3',
      value: flag === 'station' && data && data.email,
      modifiable: false,
    },
  ];

  const SENSOR_INFO_LEFT = [
    {
      title: '유량센서ID',
      value:
        flag === 'sensor' &&
        data &&
        data.filter((item) => item.snsrCndNm === '유량')[0].snsrId,
      modifiable: true,
      data:
        flag === 'sensor' &&
        data &&
        data.filter((item) => item.snsrCndNm === '유량')[0],
    },
    {
      title: '수질센서ID',
      value:
        flag === 'sensor' &&
        data &&
        data.filter((item) => item.snsrCndNm === '수질')[0].snsrId,
      modifiable: true,
      data:
        flag === 'sensor' &&
        data &&
        data.filter((item) => item.snsrCndNm === '수질')[0],
    },
    { title: '통신네트워크', value: '', modifiable: false },
  ];

  const SENSOR_INFO_RIGHT = [
    {
      title: '악취센서ID',
      value:
        flag === 'sensor' &&
        data &&
        data.filter((item) => item.snsrCndNm === '악취')[0].snsrId,
      data:
        flag === 'sensor' &&
        data &&
        data.filter((item) => item.snsrCndNm === '악취')[0],
      modifiable: true,
    },
  ];

  const SENSOR_HISTORY_LEFT = [
    {
      title: '작업자',
      value: flag === 'sensorHistory' && (
        <input
          type="text"
          placeholder="내용을 입력하세요"
          ref={reff.operNm}
        ></input>
      ),
    },
    {
      title: '첨부파일',
      value: flag === 'sensorHistory' && (
        <label htmlFor="file">
          파일 선택
          <input
            id="file"
            type="file"
            ref={reff.file}
            onChange={checkSpecial}
          ></input>
          <span className="fileText" ref={reff.fileNm}>
            선택없음
          </span>
        </label>
        // fileText 클래스의 내용에 파일이름을 불러와주면 될 것 같습니다.
      ),
    },
  ];

  const SENSOR_HISTORY_RIGHT = [
    {
      title: '작업내용',
      value: flag === 'sensorHistory' && (
        <input
          type="text"
          placeholder="내용을 입력하세요"
          ref={reff.operCm}
        ></input>
      ),
    },
    {
      title: '작업 후 센서 ID',
      value: flag === 'sensorHistory' && (
        <input
          type="text"
          placeholder="내용을 입력하세요"
          ref={reff.operId}
        ></input>
      ),
    },
  ];

  return (
    <div className="tableBox2">
      <div className="tableBox2Wrap boxFrame">
        <div className="frameLine"></div>
        <div className="dataWrap">
          <div className="tableColgroup">
            {flag === 'station'
              ? STATION_INFO_LEFT.map((item) => (
                  <AdminTableItem
                    title={item.title}
                    value={item.value}
                    modifiable={item.modifiable}
                    key={item.title}
                  />
                ))
              : flag === 'sensor'
              ? SENSOR_INFO_LEFT.map((item) => (
                  <AdminTableItem
                    title={item.title}
                    value={item.value}
                    modifiable={item.modifiable}
                    key={item.title}
                    data={item.data}
                  />
                ))
              : SENSOR_HISTORY_LEFT.map((item) => (
                  <AdminTableItem
                    title={item.title}
                    value={item.value}
                    modifiable={item.modifiable}
                    key={item.title}
                    data={item.data}
                  />
                ))}
          </div>
          <div className="tableColgroup">
            {flag === 'station'
              ? STATION_INFO_RIGHT.map((item) => (
                  <AdminTableItem
                    title={item.title}
                    value={item.value}
                    modifiable={item.modifiable}
                    key={item.title}
                  />
                ))
              : flag === 'sensor'
              ? SENSOR_INFO_RIGHT.map((item) => (
                  <AdminTableItem
                    title={item.title}
                    value={item.value}
                    modifiable={item.modifiable}
                    key={item.title}
                    data={item.data}
                  />
                ))
              : SENSOR_HISTORY_RIGHT.map((item) => (
                  <AdminTableItem
                    title={item.title}
                    value={item.value}
                    modifiable={item.modifiable}
                    key={item.title}
                    data={item.data}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTableWrap;
