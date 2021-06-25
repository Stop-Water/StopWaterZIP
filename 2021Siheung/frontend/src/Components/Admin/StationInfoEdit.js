import React from 'react';

const StationInfoEdit = ({
  stationData,
  nameRef,
  stationIdRef,
  addrRef,
  detailRef,
  serviceRef,
  buildingInfoRef,
  latRef,
  lonRef,
  routerIdRef,
  sensorIdRef,
}) => {
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
              <td width="37%">
                <input
                  type="text"
                  defaultValue={`${stationData.station_nm}`}
                  ref={nameRef}
                />
              </td>
              <th width="13%">
                지점번호 <br />
                (STN ID)
              </th>
              <td
                width="37%"
                ref={stationIdRef}
              >{`${stationData.station_id}`}</td>
            </tr>

            <tr>
              <th>주소</th>
              <td colSpan="3">
                <input
                  type="text"
                  defaultValue={`${stationData.station_addr}`}
                  ref={addrRef}
                />
              </td>
            </tr>

            <tr>
              <th>상세 설치 위치</th>
              <td>
                <input
                  type="text"
                  defaultValue={`${stationData.location_detail}`}
                  ref={detailRef}
                />
              </td>
              <th>서비스 유무</th>
              <td>
                <select ref={serviceRef} defaultValue={stationData.service_yn}>
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </select>
              </td>
            </tr>

            <tr>
              <th rowSpan="2">건물정보</th>
              <td rowSpan="2">
                <input
                  type="text"
                  defaultValue={`${stationData.building_info}`}
                  ref={buildingInfoRef}
                />
              </td>
              <th>위도</th>
              <td>
                <input
                  type="number"
                  defaultValue={`${stationData.lat}`}
                  ref={latRef}
                />
              </td>
            </tr>
            <tr>
              <th>경도</th>
              <td>
                <input
                  type="number"
                  defaultValue={`${stationData.lon}`}
                  ref={lonRef}
                />
              </td>
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
              <td>
                <input
                  type="text"
                  defaultValue={`${stationData.router_serial}`}
                  ref={routerIdRef}
                />
              </td>
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
              <td>
                <input
                  type="number"
                  defaultValue={`${stationData.sensor_id}`}
                  ref={sensorIdRef}
                  maxLength="16"
                  onChange={(e) => {
                    if (e.target.value.length > 16) {
                      alert('장비 시리얼은 최대 16자리입니다.');
                      e.target.value = e.target.value.substring(0, 16);
                    }
                  }}
                />
              </td>
              <th>관리주체</th>
              <td>{stationData.manager_dept}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StationInfoEdit;
