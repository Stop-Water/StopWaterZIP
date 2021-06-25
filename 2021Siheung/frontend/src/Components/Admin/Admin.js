import React, { useRef, useState, useEffect, useCallback } from 'react';
import GrayButton from '../Common/GrayButton';
import Popup from 'reactjs-popup';
import BlueBtn from '../Common/BuleButtons';
import StationInfo from './StationInfo';
import StationInfoEdit from './StationInfoEdit';
import StationHistory from './StationHistory';
import WriteHistory from './WriteHistory';
import StationImage from './StationImage';
import * as adminAPI from '../../lib/api/admin';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../Pages/Loading';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import UploadModal from './UploadModal';
import AirKorea from '../Airkorea/AirKoreaWarp';
import './CSS/Admin.css';
const BlueButton = BlueBtn.default;

const Admin = ({ station }) => {
  const optionRef = useRef();
  const [stationData, setStationData] = useState();
  const [stationHistory, setStationHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageURL, setImageURL] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyPerPage] = useState(5);
  const [checkedItem, setCheckedItem] = useState([]);
  const indexOfLastHistory = currentPage * historyPerPage;
  const indexOfFirstHistory = indexOfLastHistory - historyPerPage;
  const currentHistory = stationHistory.slice(
    indexOfFirstHistory,
    indexOfLastHistory,
  );
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef(),
    stationIdRef = useRef(),
    addrRef = useRef(),
    serviceRef = useRef(),
    detailRef = useRef(),
    buildingInfoRef = useRef(),
    latRef = useRef(),
    lonRef = useRef(),
    sensorIdRef = useRef(),
    routerIdRef = useRef(),
    historyWriterRef = useRef(),
    historyContRef = useRef(),
    historyfileRef = useRef(),
    delBtnRef = useRef();

  const checkChange = () => {
    const newData = {
      ...stationData,
      station_nm: nameRef.current.value,
      station_addr: addrRef.current.value,
      location_detail: detailRef.current.value,
      building_info: buildingInfoRef.current.value,
      service_yn: serviceRef.current.value,
      lat: latRef.current.value,
      lon: lonRef.current.value,
      sensor_id: sensorIdRef.current.value,
      router_serial: routerIdRef.current.value,
    };
    if (JSON.stringify(stationData) !== JSON.stringify(newData)) {
      const conf = window.confirm('관측소 정보를 수정하시겠습니까?');
      if (conf) handleUpdate();
    } else setEdit(false);
  };

  const getImgLoop = useCallback(async (station, array) => {
    setIsLoading(true);
    const length = array.length;
    for (const [index, value] of array.entries()) {
      await adminAPI
        .getImage(station, value)
        .then(function (resolvedData) {
          const result = {
            id: value,
            url: URL.createObjectURL(resolvedData.data),
          };
          setImageURL((imageURL) => [...imageURL, result]);
          if (length === index + 1) {
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          console.log('getImage error');
          console.log(error);
        });
    }
  }, []);

  const getStationImage = useCallback(
    async (station, cancleToken) => {
      setImageURL([]);
      await adminAPI
        .selectImage(station, cancleToken)
        .then((response) => {
          if (response.data.length > 0) {
            getImgLoop(optionRef.current.value, response.data);
          } else {
            setImageURL([]);
          }
        })
        .catch((error) => {
          console.log('selectImage error');
          console.log(error);
        });
    },
    [getImgLoop],
  );

  const getSataionData = useCallback(async (station, cancleToken, addFunc) => {
    await adminAPI
      .selectStation(station, cancleToken)
      .then((response) => {
        setStationData(response.data);
        if (addFunc) addFunc();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getStationHistory = useCallback(async (station, cancleToken) => {
    await adminAPI
      .selectHistory(station, cancleToken)
      .then((response) => {
        modifyHistoryData(response.data);
      })
      .catch((error) => {
        console.log('selectHistory error');
        console.log(error);
      });
  }, []);

  const insertStationHistory = useCallback(
    async (data) => {
      await adminAPI
        .insertHistory(data)
        .then(() => {
          alert('작업이력이 등록되었습니다.');
          getStationHistory(optionRef.current.value);
          historyWriterRef.current.value = '';
          historyContRef.current.value = '';
          historyfileRef.current.value = '';
          setFileName(null);
        })
        .catch((error) => {
          console.log('insertHistoryError');
          console.log(error);
        });
    },
    [getStationHistory],
  );

  const handleImgDelete = async (e) => {
    e.preventDefault();
    const conf = window.confirm('사진을 삭제하시겠습니까?');

    if (conf) {
      const reqBody = {
        stationId: optionRef.current.value,
        imgNo: e.target.id,
      };
      const jsonReq = JSON.stringify(reqBody);
      await adminAPI
        .deleteImage(jsonReq)
        .then(() => {
          alert('사진이 삭제되었습니다.');
          getStationImage(optionRef.current.value);
        })
        .catch((error) => {
          console.log('deleteImage Error');
          console.log(error);
        });
    }
  };

  const handleSearch = () => {
    setImageURL([]);
    setEdit(false);

    getStationImage(optionRef.current.value);
    getSataionData(optionRef.current.value);
    getStationHistory(optionRef.current.value);

    historyWriterRef.current.value = '';
    historyContRef.current.value = '';
    historyfileRef.current.value = '';
    setFileName(null);

    return setImageURL([]);
  };

  const checkSpecial = () => {
    const special = /[{}[\]/?,;:|)*~`!^\-_+_<>@#$%&\\=('"]/gi;
    const fileValue = historyfileRef.current.value.split('\\');
    const fileName = fileValue[fileValue.length - 1];
    if (special.test(fileName) === true) {
      alert('파일 이름에는 특수문자가 들어갈 수 없습니다.');
      historyfileRef.current.value = null;
    } else setFileName(fileName);
  };

  const modifyHistoryData = (data) => {
    data.forEach((element, index) => {
      element.index = index + 1;
    });
    setStationHistory(data.reverse());
  };

  const handleUpdate = async () => {
    const reqBody = {
      stationId: stationIdRef.current.childNodes[0].nodeValue,
      serviceYn: serviceRef.current.value,
      stationNm: nameRef.current.value,
      stationAddr: addrRef.current.value,
      locationDetail: detailRef.current.value,
      buildingInfo: buildingInfoRef.current.value,
      lon: lonRef.current.value,
      lat: latRef.current.value,
      routerSerial: routerIdRef.current.value,
    };
    const jsonReq = JSON.stringify(reqBody);

    const sensorReqBody = {
      stationId: stationIdRef.current.childNodes[0].nodeValue,
      beforeSensorId: stationData.sensor_id,
      afterSensorId: sensorIdRef.current.value,
    };

    const sensorJsonReq = JSON.stringify(sensorReqBody);

    await adminAPI
      .updateStation(jsonReq)
      .then(async () => {
        if (stationData.sensor_id === sensorIdRef.current.value) {
          alert(`관측소(${nameRef.current.value}) 정보가 수정되었습니다.`);
          const setEditFalse = () => {
            setEdit(false);
          };
          getSataionData(optionRef.current.value, null, setEditFalse);
        } else {
          await adminAPI
            .updateSensor(sensorJsonReq)
            .then(() => {
              alert(`관측소(${nameRef.current.value}) 정보가 수정되었습니다.`);
              const setEditFalse = () => {
                setEdit(false);
              };
              getSataionData(optionRef.current.value, null, setEditFalse);
            })
            .catch((error) => {
              console.log('updateSensor error');
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log('updateStation error');
        console.log(error);
      });
  };

  const handleWriteHistory = async () => {
    const conf = window.confirm('작업이력을 등록하시겠습니까?');
    if (conf) {
      if (historyfileRef.current.files[0]) {
        const form = new FormData();
        form.append('file', historyfileRef.current.files[0]);
        await axios
          .post('/uploadfile/admin', form)
          .then((response) => {
            const reqBody = {
              stationId: stationData.station_id,
              cont: historyContRef.current.value,
              writer: historyWriterRef.current.value,
              attachLink: response.data.fileDownloadUri,
              attachName: response.data.fileName,
            };
            const jsonReq = JSON.stringify(reqBody);
            insertStationHistory(jsonReq);
          })
          .catch((error) => {
            console.log('uploadFile error');
            console.log(error);
          });
      } else {
        const reqBody = {
          stationId: stationData.station_id,
          cont: historyContRef.current.value,
          writer: historyWriterRef.current.value,
        };
        const jsonReq = JSON.stringify(reqBody);
        insertStationHistory(jsonReq);
      }
    }
  };

  const checkHistoryCont = () => {
    if (
      historyWriterRef.current.value.replace(/ /g, '') === '' &&
      historyContRef.current.value.replace(/ /g, '') === ''
    ) {
      alert('작업자와 작업내용은 필수입력 필드입니다.');
    } else {
      handleWriteHistory();
    }
  };

  const handleCancleAttach = () => {
    const conf = window.confirm('파일 첨부를 취소하시겠습니까?');
    if (conf) {
      historyfileRef.current.value = '';
      setFileName(null);
    }
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const toggleModal = (e) => {
    setIsOpen(!isOpen);
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      setCheckedItem((checkedItem) => [...checkedItem, e.target.id]);
    } else {
      setCheckedItem(checkedItem.filter((id) => id !== e.target.id));
    }
  };

  const handleDeleteHistory = async () => {
    const conf = window.confirm('선택한 작업이력을 삭제하시겠습니까?');
    if (conf) {
      const reqBody = {
        stationId: optionRef.current.value,
        seqList: checkedItem,
      };
      const jsonReq = JSON.stringify(reqBody);

      await adminAPI
        .deleteHistory(jsonReq)
        .then(() => {
          window.alert('작업이력이 삭제되었습니다.');
          getStationHistory(optionRef.current.value);
        })
        .catch((error) => {
          console.log('deleteHistory error');
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const cancleToken = axios.CancelToken.source();

    getSataionData(optionRef.current.value, cancleToken.token);
    getStationImage(optionRef.current.value, cancleToken.token);
    getStationHistory(optionRef.current.value, cancleToken.token);

    return () => {
      cancleToken.cancel();
    };
  }, [getSataionData, getStationImage, getStationHistory]);

  return (
    <div className="subContBGWrap">
      {isLoading ? <Loading></Loading> : <></>}
      <div className="subContainer">
        <div className="subHead">
          <div className="subTitBox">
            <h1 className="subTit mb-0">
              <img
                src="/img/common/leftMenu02Over.png"
                alt="관측소 정보관리 아이콘"
              />
              &nbsp; 관측소 정보관리
            </h1>
            <h4>
              <FontAwesomeIcon icon={faHome} color="#fff" /> &nbsp; HOME &#62;
              관리자 &#62; 관측소 정보관리
            </h4>
          </div>
        </div>
        <div className="subContBox">
          <div className="adminContWrap">
            <div className="selectArea col-xs-12 col-xl-12">
              <h2 className="selectTit">· 관측소명</h2>
              <select ref={optionRef} onChange={handleSearch}>
                {station.map((staion, index) => (
                  <option value={staion.value} key={index}>
                    {staion.label}
                  </option>
                ))}
              </select>
              <div className="searchArea">
                <Popup
                  arrow
                  closeOnDocumentClick
                  closeOnEscape
                  modal
                  mouseEnterDelay={100}
                  mouseLeaveDelay={100}
                  on={['click']}
                  onClose={() => {}}
                  onOpen={function noRefCheck() {}}
                  position="bottom center"
                  repositionOnResize
                  trigger={
                    <div className="airKoreaBtn">
                      <BlueButton>국가대기오염측정망 미세먼지 정보</BlueButton>
                    </div>
                  }
                >
                  <AirKorea />
                </Popup>
                <BlueButton
                  onClick={() => {
                    window.open('/siheung/fogSensor', '_blank');
                  }}
                >
                  시정센서 페이지
                </BlueButton>
              </div>
            </div>

            {stationData ? (
              edit ? (
                <>
                  <StationInfoEdit
                    stationData={stationData}
                    nameRef={nameRef}
                    stationIdRef={stationIdRef}
                    addrRef={addrRef}
                    detailRef={detailRef}
                    serviceRef={serviceRef}
                    buildingInfoRef={buildingInfoRef}
                    latRef={latRef}
                    lonRef={lonRef}
                    routerIdRef={routerIdRef}
                    sensorIdRef={sensorIdRef}
                  />
                  <div className="multiBTN mt-4">
                    <GrayButton
                      onClick={() => {
                        setEdit(false);
                      }}
                    >
                      취소
                    </GrayButton>
                    <BlueButton onClick={checkChange}>완료</BlueButton>
                  </div>
                </>
              ) : (
                <>
                  <StationInfo
                    stationData={stationData}
                    stationIdRef={stationIdRef}
                  />
                  <div className="searchArea mt-4">
                    <BlueButton onClick={() => setEdit(true)}>수정</BlueButton>
                  </div>
                </>
              )
            ) : (
              <></>
            )}
            <div className="clearBoth"></div>
          </div>
          <StationImage
            imageURL={imageURL}
            isLoading={isLoading}
            handleImgDelete={handleImgDelete}
            toggleModal={toggleModal}
          />
          <WriteHistory
            historyWriterRef={historyWriterRef}
            historyContRef={historyContRef}
            historyfileRef={historyfileRef}
            checkSpecial={checkSpecial}
            fileName={fileName}
            delBtnRef={delBtnRef}
            handleCancleAttach={handleCancleAttach}
            handleWriteHistory={checkHistoryCont}
          />
          <StationHistory
            currentHistory={currentHistory}
            handleChecked={handleChecked}
            checkedItem={checkedItem}
            stationHistory={stationHistory}
            historyPerPage={historyPerPage}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            handleDeleteHistory={handleDeleteHistory}
          />
        </div>
      </div>
      {stationData ? (
        <UploadModal
          stationId={stationData.station_id}
          isOpen={isOpen}
          toggleModal={toggleModal}
          selectImage={getStationImage}
          setIsOpen={setIsOpen}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Admin;
