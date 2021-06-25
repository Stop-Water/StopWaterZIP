import React from 'react';
import './CSS/AirWrap.css';
import '../Admin/CSS/UploadModal.css';
import Table from './Table';

const AirKorea = ({
  daeyaData,
  janghyeonData,
  mokgamData,
  sihwaData,
  jungwangData,
}) => {
  return (
    <>
      <div className="airWrapWidth">
        <h1 className="modalHeader">국가대기오염측정망 미세먼지 정보</h1>
        <Table name="목감동" data={mokgamData} />
        <Table name="대야동" data={daeyaData} />
        <Table name="시화산단" data={sihwaData} />
        <Table name="장현동" data={janghyeonData} />
        <Table name="정왕동" data={jungwangData} />
        <div className="clearBoth"></div>
      </div>
      <div className="airKorea_Info">
        <p>출처 : 환경부/한국환경공단</p>
        <p className="air_warning">
          데이터는 실시간 관측된 자료이며 측정소 현지 사정이나 데이터의
          수신상태에 따라 미수신 될 수 있음
        </p>
      </div>
    </>
  );
};

export default AirKorea;
