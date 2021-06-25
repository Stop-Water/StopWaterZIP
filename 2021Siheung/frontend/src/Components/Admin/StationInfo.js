import React from 'react';

const StationInfo = ({ stationData, stationIdRef }) => {
  return (
    <>
      <h2 className="adminTit">{`· 관측소 정보 (${stationData.station_nm})`}</h2>
      <div className="adminTableGrid">
        <table>
          <tbody>
            <tr>
              <th width="13%">
                지점명
                <br />
                (STN NM)
              </th>
              <td width="37%">{stationData.station_nm}</td>
              <th width="13%">
                지점번호 <br />
                (STN ID)
              </th>
              <td width="37%" ref={stationIdRef}>
                {stationData.station_id}
              </td>
            </tr>

            <tr>
              <th>주소</th>
              <td colSpan="3">{stationData.station_addr}</td>
            </tr>

            <tr>
              <th>상세 설치 위치</th>
              <td>{stationData.location_detail}</td>
              <th>서비스 유무</th>
              <td>{stationData.service_yn}</td>
            </tr>

            <tr>
              <th rowSpan="2">건물정보</th>
              <td rowSpan="2">{stationData.building_info}</td>
              <th>위도</th>
              <td>{`${stationData.lat}°`}</td>
            </tr>
            <tr>
              <th>경도</th>
              <td>{`${stationData.lon}°`}</td>
            </tr>

            <tr>
              <th>구축일</th>
              <td>{`${stationData.install_date.substring(
                0,
                4,
              )}년 ${stationData.install_date.substring(
                4,
                6,
              )}월 ${stationData.install_date.substring(6, 8)}일`}</td>
              <th>담당부서(담당자)</th>
              <td>{stationData.manager_nm}</td>
            </tr>

            <tr>
              <th>라우터 시리얼</th>
              <td>{stationData.router_serial}</td>
              <th>연락처</th>
              {stationData.manager_tel && stationData.manager_mobile ? (
                <td>{`${stationData.manager_tel} / ${stationData.manager_mobile}`}</td>
              ) : stationData.manager_tel ? (
                <td>{stationData.manager_tel}</td>
              ) : (
                <td>{stationData.manager_mobile}</td>
              )}
            </tr>

            <tr>
              <th>장비 시리얼</th>
              <td>{stationData.sensor_id}</td>
              <th>관리주체</th>
              <td>{stationData.manager_dept}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StationInfo;
