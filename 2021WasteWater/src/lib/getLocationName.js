export const getLocationName = (lon, lat, callback) => {
  try {
    const kakao = window.kakao.maps.services;
    const geocoder = new kakao.Geocoder();
    geocoder.coord2RegionCode(lon, lat, callback);
  } catch (err) {
    console.error(`Can't get Kakaomap API service`);
    console.error(err);
  }
};
