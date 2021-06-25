import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from 'react';
import './CSS/NaverMap.css';
import LayerMenu from './LayerMenu';
import CustomSlider from './CustomSlider';

const Popup = React.lazy(() => import('./Popup'));
const CCTVPoppup = React.lazy(() => import('./CCTVPopup'));
const Legend = React.lazy(() => import('./Legend'));

function NaverMap({ data, cctvData }) {
  const [sliderValue, setSliderValue] = useState(0),
    [nameProps, setNameProps] = useState(),
    [layerProps, setLayerProps] = useState('fog'),
    [colorProps, setColorProps] = useState(),
    [dataProps, setDataProps] = useState(),
    [openCCTV, setOpenCCTV] = useState(false),
    naverRef = useRef(window.naver),
    mapRef = useRef(),
    isPlaying = useRef(false),
    fogMarkersRef = useRef(),
    fogMarkersA1Ref = useRef(),
    fogMarkersA2Ref = useRef(),
    fogMarkersA3Ref = useRef(),
    tempMarkerRef = useRef(),
    humidMarkerRef = useRef(),
    //rainMarkersRef = useRef(),
    dustMarkerRef = useRef(),
    clickedWindowRef = useRef([]),
    cctvMarkerRef = useRef(),
    eventTargetRef = useRef(null),
    sliderValueRef = useRef(sliderValue);
  sliderValueRef.current = sliderValue;

  const createMap = useCallback(() => {
    const naver = naverRef.current;
    const CENTER_POINT = new naver.maps.LatLng(37.382727, 126.741352);
    //const SOUTHWEST_BOUND = new naver.maps.LatLng(37.333625, 126.594872);
    //const NORTHEAST_BOUND = new naver.maps.LatLng(37.437964, 126.809319);
    const mapOptions = {
      center: CENTER_POINT,
      //maxBounds: new naver.maps.LatLngBounds(SOUTHWEST_BOUND, NORTHEAST_BOUND),
      zoom: 13,
      minZoom: 12,
      disableKineticPan: false,
    };

    const map = new naver.maps.Map('map', mapOptions);

    naver.maps.Event.addListener(map, 'click', () => {
      const eventTarget = eventTargetRef.current;
      if (eventTarget !== null) eventTarget.setMap(map);
      closeInfoWindow();
      closePopup();
      closeCopyrihgt();
    });

    const agent = navigator.userAgent.toLowerCase();

    if (
      (navigator.appName === 'Netscape' &&
        navigator.userAgent.search('Trident') !== -1) ||
      agent.indexOf('msie') !== -1
    ) {
      naver.maps.Event.once(map, 'tilesloaded', () => {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('resize', true, false);
        setTimeout(() => {
          window.dispatchEvent(evt);
        }, 100);
      });
    }

    createCustomButton(naver, map);

    return map;
  }, []);

  const generateCCTVMarkers = useCallback((cctvData) => {
    const naver = naverRef.current;
    const markers = [];

    cctvData.forEach((element) => {
      const cctvMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(element.lat, element.lon),
        icon: {
          content: [`<img src="/img/map/cctvPoint.png" alt="CCTV Point">`].join(
            '',
          ),
          anchor: new naver.maps.Point(20, 60),
        },
      });

      naver.maps.Event.addListener(cctvMarker, 'click', () => {
        closeCopyrihgt();
        setDataProps(element.url);
        setNameProps(element.name);
        showCCTVPopup();
      });

      markers.push(cctvMarker);
    });
    return markers;
  }, []);

  const generateMarkers = useCallback((data, flag) => {
    const naver = naverRef.current;
    const markers = [];

    const markerColors = {
      blue: 'sunny',
      green: 'dustVeryGood',
      yellow: 'cloudy',
      red: 'fog',
      white: 'Default',
      gray: 'checking',
      deepblue: 'rain',
      underzero: 'subzero',
    };
    const colorPalette = {
      blue: '#31afe4',
      green: '#48bf0d',
      yellow: '#ffbc5b',
      red: '#fa4f1b',
      gray: '#9f9f9f',
      deepblue: '#3a458a',
      white: '#fff',
      underzero: '#182e9c',
    };

    data.forEach((element) => {
      let windowMarker;
      let clickedWindowMarker;
      let content;

      let markerColor = markerColors.blue;
      let circleColorBig = colorPalette.blue;
      let circleColorSmall = colorPalette.blue;
      let strokeColorSmall = colorPalette.white;

      if (
        !element.humid ||
        !element.temperature ||
        !element.pm25
        //|| !element.rainfall
      ) {
        content = '점검중';
        markerColor = markerColors.gray;
        circleColorSmall = colorPalette.gray;
        circleColorBig = colorPalette.gray;
      } else {
        switch (flag) {
          case 'humid':
            content = `${element.humid}%`;
            if (element.humid < 30) {
              markerColor = markerColors.red;
              circleColorBig = colorPalette.red;
              circleColorSmall = colorPalette.red;
            } else if (element.humid < 50 && element.humid >= 30) {
              markerColor = markerColors.yellow;
              circleColorBig = colorPalette.yellow;
              circleColorSmall = colorPalette.yellow;
            } else if (element.humid >= 50) {
              markerColor = markerColors.blue;
              circleColorBig = colorPalette.blue;
              circleColorSmall = colorPalette.blue;
            } else {
              content = '점검중';
              markerColor = markerColors.gray;
              circleColorBig = colorPalette.gray;
              circleColorSmall = colorPalette.gray;
            }
            break;
          case 'temp':
            content =
              element.temperature === '-0.0'
                ? '0.0℃'
                : `${element.temperature}℃`;
            if (element.temperature < 10 && element.temperature >= 0) {
              markerColor = markerColors.blue;
              circleColorBig = colorPalette.blue;
              circleColorSmall = colorPalette.blue;
            } else if (element.temperature < 30 && element.temperature >= 10) {
              markerColor = markerColors.yellow;
              circleColorBig = colorPalette.yellow;
              circleColorSmall = colorPalette.yellow;
            } else if (element.temperature >= 30) {
              markerColor = markerColors.red;
              circleColorBig = colorPalette.red;
              circleColorSmall = colorPalette.red;
            } else if (element.temperature < 0) {
              markerColor = markerColors.underzero;
              circleColorBig = colorPalette.underzero;
              circleColorSmall = colorPalette.underzero;
            } else {
              content = '점검중';
              markerColor = markerColors.gray;
              circleColorBig = colorPalette.gray;
              circleColorSmall = colorPalette.gray;
            }
            break;
          case 'dust':
            //content = `${element.pm25}μg/㎥`;
            if (element.pm25 < 15) {
              markerColor = markerColors.blue;
              circleColorBig = colorPalette.blue;
              circleColorSmall = colorPalette.blue;
              content = '좋음';
            } else if (element.pm25 < 35 && element.pm25 >= 15) {
              content = '보통';
              markerColor = markerColors.green;
              circleColorBig = colorPalette.green;
              circleColorSmall = colorPalette.green;
            } else if (element.pm25 < 75 && element.pm25 >= 35) {
              content = '나쁨';
              markerColor = markerColors.yellow;
              circleColorBig = colorPalette.yellow;
              circleColorSmall = colorPalette.yellow;
            } else if (element.pm25 >= 75) {
              content = '매우 나쁨';
              markerColor = markerColors.red;
              circleColorBig = colorPalette.red;
              circleColorSmall = colorPalette.red;
            } else {
              content = '점검중';
              markerColor = markerColors.gray;
              circleColorBig = colorPalette.gray;
              circleColorSmall = colorPalette.gray;
            }
            break;
          case 'fog':
            if (element.dect_val === '0') {
              content = '안개 없음';
              markerColor = markerColors.blue;
              circleColorBig = colorPalette.blue;
              circleColorSmall = colorPalette.blue;
            } else if (element.dect_val === '1') {
              content = '옅은 안개';
              markerColor = markerColors.yellow;
              circleColorBig = colorPalette.yellow;
              circleColorSmall = colorPalette.yellow;
            } else if (element.dect_val === '2') {
              content = '짙은 안개';
              markerColor = markerColors.red;
              circleColorBig = colorPalette.red;
              circleColorSmall = colorPalette.red;
            } else if (element.dect_val === '3') {
              content = '강수';
              markerColor = markerColors.deepblue;
              circleColorBig = colorPalette.deepblue;
              circleColorSmall = colorPalette.deepblue;
            } else {
              content = '점검중';
              markerColor = markerColors.gray;
              circleColorBig = colorPalette.gray;
              circleColorSmall = colorPalette.gray;
            }
            break;
          case 'fore1':
          case 'fore2':
          case 'fore3':
            let forecastedData;
            if (flag === 'fore1') forecastedData = element.fcst_1hr;
            else if (flag === 'fore2') forecastedData = element.fcst_2hr;
            else if (flag === 'fore3') forecastedData = element.fcst_3hr;

            if (forecastedData === '0') {
              content = '안개 없음';
              markerColor = markerColors.blue;
              circleColorBig = colorPalette.blue;
              circleColorSmall = colorPalette.blue;
            } else if (forecastedData === '1') {
              content = '옅은 안개';
              markerColor = markerColors.yellow;
              circleColorBig = colorPalette.yellow;
              circleColorSmall = colorPalette.yellow;
            } else if (forecastedData === '2') {
              content = '짙은 안개';
              markerColor = markerColors.red;
              circleColorBig = colorPalette.red;
              circleColorSmall = colorPalette.red;
            } else {
              content = '예측값 없음';
              markerColor = markerColors.gray;
              circleColorBig = colorPalette.gray;
              circleColorSmall = colorPalette.gray;
            }
            break;
          /*case 'rain':
            content = `${element.rainfall}`;
            break;*/
          default:
            break;
        }
      }

      let smallCricle = new naver.maps.Marker({
        position: new naver.maps.LatLng(element.lat, element.lon),
        icon: {
          path: 3,
          radius: 10,
          fillColor: circleColorSmall,
          fillOpacity: 1,
          strokeColor: strokeColorSmall,
          strokeStyle: 'solid',
          strokeWeight: 3,
        },
        title: element.station_nm,
        cursor: 'default',
      });
      let largeCircle = new naver.maps.Marker({
        position: new naver.maps.LatLng(element.lat, element.lon),
        icon: {
          path: 3,
          radius: 25,
          fillColor: circleColorBig,
          fillOpacity: 0.3,
          clikable: false,
          strokeWeight: 0,
          anchor: new naver.maps.Point(25, 37),
        },
        cursor: 'default',
      });

      if (window.innerWidth <= 420) {
        windowMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(element.lat, element.lon),
          icon: {
            /*content: [
              `<div class="mapMarker ${markerColor}">
          <div class="mapBalloon width420">
            <h1 class="tit">${element.station_nm}</h1>
            <p>${content}</p>
          </div>`,*/
            content: [
              `<div class="mapMarker ${markerColor}">
        <div class="mapBalloon width420">
          <p>${content}</p>
        </div>`,
            ].join(''),
            anchor: new naver.maps.Point(395, 225),
          },
        });

        clickedWindowMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(element.lat, element.lon),
          icon: {
            /*content: [
              `<div class="mapMarker ${markerColor}">
          <div class="mapBalloon big width420">
            <h1 class="tit">${element.station_nm}</h1>
            <p>${content}</p>
          </div>`,*/
            content: [
              `<div class="mapMarker ${markerColor}">
        <div class="mapBalloon big width420">
          <p>${content}</p>
        </div>`,
            ].join(''),
            anchor: new naver.maps.Point(403, 240),
          },
        });
      } else if (window.innerWidth > 420 && window.innerWidth <= 1200) {
        windowMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(element.lat, element.lon),
          icon: {
            content: [
              /* `<div class="mapMarker ${markerColor}">
        <div class="mapBalloon">
          <h1 class="tit">${element.station_nm}</h1>
          <p>${content}</p>
        </div>`,*/
              `<div class="mapMarker ${markerColor}">
        <div class="mapBalloon">
          <p>${content}</p>
        </div>`,
            ].join(''),
            anchor: new naver.maps.Point(399, 230),
          },
        });

        clickedWindowMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(element.lat, element.lon),
          icon: {
            content: [
              /*`<div class="mapMarker ${markerColor}">
        <div class="mapBalloon big">
          <h1 class="tit">${element.station_nm}</h1>
          <p>${content}</p>
        </div>`,*/
              `<div class="mapMarker ${markerColor}">
        <div class="mapBalloon big">
          <p>${content}</p>
        </div>`,
            ].join(''),
            anchor: new naver.maps.Point(402, 242),
          },
        });
      } else {
        windowMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(element.lat, element.lon),
          icon: {
            content: [
              /*`<div class="mapMarker ${markerColor}">
        <div class="mapBalloon">
          <h1 class="tit">${element.station_nm}</h1>
          <p>${content}</p>
        </div>`,*/
              `<div class="mapMarker ${markerColor}">
              <div class="mapBalloon">
              <p>${content}</p>
                </div>`,
            ].join(''),
            anchor: new naver.maps.Point(411, 235),
          },
        });

        clickedWindowMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(element.lat, element.lon),
          icon: {
            content: [
              /*`<div class="mapMarker ${markerColor}">
        <div class="mapBalloon big">
          <h1 class="tit">${element.station_nm}</h1>
          <p>${content}</p>
        </div>`,*/
              `<div class="mapMarker ${markerColor}">
        <div class="mapBalloon big">
          <p>${content}</p>
        </div>`,
            ].join(''),
            anchor: new naver.maps.Point(416, 250),
          },
        });
      }

      naver.maps.Event.addListener(clickedWindowMarker, 'click', () => {
        clickedWindowMarker.setMap(null);
        windowMarker.setMap(mapRef.current);
        closePopup();
        closeCopyrihgt();
      });

      naver.maps.Event.addListener(windowMarker, 'click', (e) => {
        const eventTarget = eventTargetRef.current; // 현재 클릭되어 있는 위치의 window 마커를 받아옴
        if (eventTarget !== null) eventTarget.setMap(mapRef.current); // 다른 마커를 클릭했을때 현재 클릭된 마커가 사라지는걸 방지
        eventTargetRef.current = e.overlay;
        closeInfoWindow();
        closeCopyrihgt();
        windowMarker.setMap(null);
        clickedWindowMarker.setMap(mapRef.current);
        if (flag !== 'fore1' && flag !== 'fore2' && flag !== 'fore3') {
          switch (e.overlay.eventTarget.classList[1]) {
            //클릭된 개체의 colorFlag로 사용될 ClassName을 받아온다.
            case 'sunny':
              setColorProps('BLUE');
              break;
            case 'cloudy':
              setColorProps('YELLOW');
              break;
            case 'fog':
              setColorProps('RED');
              break;
            case 'rain':
              setColorProps('DEEPBLUE');
              break;
            case 'subzero':
              setColorProps('SUBZERO');
              break;
            case 'dustVeryGood':
              setColorProps('GREEN');
              break;
            default:
              setColorProps('GRAY');
              break;
          }
          if (
            !element.humid ||
            !element.temperature ||
            !element.pm25
            //||!element.rainfall
          ) {
            setDataProps('점검중');
          } else {
            setDataProps({
              temp: element.temperature,
              fog: element.dect_val,
              fore1: element.fcst_1hr,
              fore2: element.fcst_2hr,
              fore3: element.fcst_3hr,
              humid: element.humid,
              pm25: element.pm25,
              //rain: element.rainfall,
            });
          }
          setNameProps(element.station_nm);
          showPopup();
        }
      });

      markers.push(largeCircle);
      markers.push(smallCricle);
      markers.push(windowMarker);
      clickedWindowRef.current.push(clickedWindowMarker);
    });
    return markers;
  }, []);

  const showMarkers = (map, marker) => {
    if (marker) {
      marker.forEach((element) => {
        element.setMap(map);
      });
    }
  };

  const hideMarkers = (marker) => {
    if (marker) {
      marker.forEach((element) => {
        element.setMap(null);
      });
    }
  };

  const hideAllFogMarkers = () => {
    const fogMarkers = fogMarkersRef.current,
      fogMarkersA1 = fogMarkersA1Ref.current,
      fogMarkersA2 = fogMarkersA2Ref.current,
      fogMarkersA3 = fogMarkersA3Ref.current,
      cctvMarkers = cctvMarkerRef.current;
    hideMarkers(fogMarkers);
    hideMarkers(fogMarkersA1);
    hideMarkers(fogMarkersA2);
    hideMarkers(fogMarkersA3);
    hideMarkers(cctvMarkers);
  };

  const switchMarkers = (
    add1,
    add2,
    remove1,
    remove2,
    remove3,
    remove4,
    remove5,
  ) => {
    const map = mapRef.current;
    showMarkers(map, add1);
    showMarkers(map, add2);
    hideMarkers(remove1);
    hideMarkers(remove2);
    hideMarkers(remove3);
    hideMarkers(remove4);
    //hideMarkers(remove5);
  };

  const switchFogMarkers = (add, remove1, remove2, remove3) => {
    const map = mapRef.current;
    showMarkers(map, add);
    hideMarkers(remove1);
    hideMarkers(remove2);
    hideMarkers(remove3);
  };

  const closeInfoWindow = () => {
    clickedWindowRef.current.forEach((element) => {
      element.setMap(null);
    });
  };

  const showPopup = () => {
    const popup = document.querySelector('.weathInfoBox');
    popup.style.display = 'block';
  };

  const showCCTVPopup = () => {
    setOpenCCTV(true);
  };

  const closePopup = () => {
    const popup = document.querySelector('.weathInfoBox');
    popup.style.display = 'none';
  };

  const closeCCTVPopup = () => {
    setOpenCCTV(false);
  };

  const closeCopyrihgt = () => {
    const copyright = document.querySelector('.copyBox');
    copyright.style.display = 'none';
  };

  const createCustomButton = (naver, map) => {
    const zoomPlusHtml = `<div class="btn plu"></div>`;
    const zoomMinusHtml = `<div class="btn min"></div>`;
    const defaultHtml = `<div class="btn mapfocus"></div>`;

    naver.maps.Event.once(map, 'init_stylemap', () => {
      const customControl = new naver.maps.CustomControl(zoomMinusHtml, {
        position: naver.maps.Position.LEFT_BOTTOM,
      });

      customControl.setMap(map);

      naver.maps.Event.addDOMListener(
        customControl.getElement(),
        'click',
        () => {
          map.setZoom(map.getZoom() - 1, true);
        },
      );
    });

    naver.maps.Event.once(map, 'init_stylemap', () => {
      const customControl = new naver.maps.CustomControl(zoomPlusHtml, {
        position: naver.maps.Position.LEFT_BOTTOM,
      });

      customControl.setMap(map);

      naver.maps.Event.addDOMListener(
        customControl.getElement(),
        'click',
        () => {
          map.setZoom(map.getZoom() + 1, true);
        },
      );
    });

    naver.maps.Event.once(map, 'init_stylemap', () => {
      const customControl = new naver.maps.CustomControl(defaultHtml, {
        position: naver.maps.Position.LEFT_BOTTOM,
      });

      customControl.setMap(map);

      naver.maps.Event.addDOMListener(
        customControl.getElement(),
        'click',
        () => {
          map.morph(new naver.maps.LatLng(37.365727, 126.741352), 13, true);
        },
      );
    });
  };

  useEffect(() => {
    mapRef.current = createMap();
    fogMarkersRef.current = generateMarkers(data, 'fog');
    fogMarkersA1Ref.current = generateMarkers(data, 'fore1');
    fogMarkersA2Ref.current = generateMarkers(data, 'fore2');
    fogMarkersA3Ref.current = generateMarkers(data, 'fore3');
    tempMarkerRef.current = generateMarkers(data, 'temp');
    humidMarkerRef.current = generateMarkers(data, 'humid');
    //rainMarkersRef.current = generateMarkers(data, 'rain');
    dustMarkerRef.current = generateMarkers(data, 'dust');
    cctvMarkerRef.current = generateCCTVMarkers(cctvData);
    showMarkers(mapRef.current, cctvMarkerRef.current);
    showMarkers(mapRef.current, fogMarkersRef.current);
  }, [data, cctvData, createMap, generateMarkers, generateCCTVMarkers]);

  const handleClick = (e) => {
    const fogMarkers = fogMarkersRef.current,
      tempMarkers = tempMarkerRef.current,
      humidMarkers = humidMarkerRef.current,
      //rainMarkers = rainMarkersRef.current,
      dustMarkers = dustMarkerRef.current,
      cctvMarkers = cctvMarkerRef.current,
      slider = document.querySelector('.sliderContainer');
    eventTargetRef.current = null;
    closeInfoWindow();
    closePopup();
    closeCopyrihgt();
    switch (e.target.id) {
      case 'fog':
      case 'fogSpan':
        slider.style.display = 'flex';
        setSliderValue(0);
        hideAllFogMarkers();
        switchMarkers(
          cctvMarkers,
          fogMarkers,
          tempMarkers,
          humidMarkers,
          //rainMarkers,
          dustMarkers,
        );
        setLayerProps('fog');
        break;
      case 'temp':
      case 'tempSpan':
        slider.style.display = 'none';
        setSliderValue(0);
        hideAllFogMarkers();
        switchMarkers(
          tempMarkers,
          null,
          fogMarkers,
          humidMarkers,
          //rainMarkers,
          dustMarkers,
          cctvMarkers,
        );
        setLayerProps('temp');
        break;
      case 'humid':
      case 'humidSpan':
        slider.style.display = 'none';
        setSliderValue(0);
        hideAllFogMarkers();
        switchMarkers(
          humidMarkers,
          null,
          fogMarkers,
          tempMarkers,
          //rainMarkers,
          dustMarkers,
          cctvMarkers,
        );
        setLayerProps('humid');
        break;
      /*case 'rain':
      case 'rainSpan':
        slider.style.display = 'none';
        setSliderValue(0);
        hideAllFogMarkers();
        switchMarkers(
          rainMarkers,
          fogMarkers,
          humidMarkers,
          dustMarkers,
          tempMarkers,
          cctvMarkers,
        );
        setLayerProps('rain');
        break;*/
      case 'dust':
      case 'dustSpan':
        slider.style.display = 'none';
        setSliderValue(0);
        hideAllFogMarkers();
        switchMarkers(
          dustMarkers,
          null,
          fogMarkers,
          humidMarkers,
          //rainMarkers,
          tempMarkers,
          cctvMarkers,
        );
        setLayerProps('dust');
        break;
      /*case 'cctv':
      case 'cctvSpan':
        slider.style.display = 'none';
        setSliderValue(0);
        hideAllFogMarkers();
        switchMarkers(
          cctvMarkers,
          dustMarkers,
          fogMarkers,
          humidMarkers,
          //rainMarkers,
          tempMarkers,
        );
        setLayerProps('cctv');
        break;*/
      default:
        break;
    }
  };

  const handlechange = (e, value) => {
    const fogMarkers = fogMarkersRef.current,
      fogMarkersA1 = fogMarkersA1Ref.current,
      fogMarkersA2 = fogMarkersA2Ref.current,
      fogMarkersA3 = fogMarkersA3Ref.current;
    eventTargetRef.current = null;
    closeInfoWindow();
    closePopup();
    closeCopyrihgt();
    switch (value) {
      case 1:
        switchFogMarkers(fogMarkersA1, fogMarkers, fogMarkersA2, fogMarkersA3);
        setSliderValue(value);
        break;
      case 2:
        switchFogMarkers(fogMarkersA2, fogMarkers, fogMarkersA1, fogMarkersA3);
        setSliderValue(value);
        break;
      case 3:
        switchFogMarkers(fogMarkersA3, fogMarkers, fogMarkersA1, fogMarkersA2);
        setSliderValue(value);
        break;
      default:
        switchFogMarkers(fogMarkers, fogMarkersA1, fogMarkersA2, fogMarkersA3);
        setSliderValue(0);
        break;
    }
  };

  const handlePlay = (e) => {
    const container = document.querySelector('.sliderContainer');
    e.preventDefault();
    if (sliderValue === 0) {
      isPlaying.current = true;
      container.style.pointerEvents = 'none';
      for (let i = 0; i <= 3; i++) {
        ((x) => {
          setTimeout(() => {
            handlechange(e, sliderValueRef.current + 1);
            if (i === 2) {
              isPlaying.current = false;
            }
            if (i === 3) {
              container.style.pointerEvents = 'auto';
            }
          }, 1500 * x);
        })(i);
      }
    } else {
      handlechange(e, 0);
    }
  };

  if (!data) {
    return null;
  }
  return (
    <>
      <div id="map">
        <Legend layer={layerProps} />
        {isPlaying.current ? (
          <></>
        ) : (
          <LayerMenu clicked={layerProps} handleClick={handleClick} />
        )}
        <Suspense fallback={<></>}>
          <Popup
            color={colorProps}
            layer={layerProps}
            name={nameProps}
            data={dataProps}
            close={closePopup}
          ></Popup>
          {openCCTV ? (
            <CCTVPoppup
              name={nameProps}
              data={dataProps}
              close={closeCCTVPopup}
            ></CCTVPoppup>
          ) : (
            <></>
          )}
        </Suspense>
        <CustomSlider
          isplaying={isPlaying.current}
          handlePlay={handlePlay}
          handlechange={handlechange}
          sliderValue={sliderValue}
        />
      </div>
    </>
  );
}

export default NaverMap;
