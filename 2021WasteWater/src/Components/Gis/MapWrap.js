import Map from './Map';
import useDarkMode from 'use-dark-mode';
import XYZ from 'ol/source/XYZ';

function MapWrap() {
  const darkmode = useDarkMode();

  const layer = darkmode.value ? 'midnight' : 'Base';

  const mapSource = new XYZ({
    url: `http://xdworld.vworld.kr:8080/2d/${layer}/202002/{z}/{x}/{y}.png`,
  });

  const nightMapSource = new XYZ({
    url: darkmode.value
      ? 'http://xdworld.vworld.kr:8080/2d/Hybrid/202002/{z}/{x}/{y}.png'
      : '',
  });

  return <Map mapSource={mapSource} nightMapSource={nightMapSource} />;
}

export default MapWrap;
