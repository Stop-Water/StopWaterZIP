export default function exportCSV(obj) {
  let modifiedData = [];
  obj.forEach((element) => {
    modifiedData = [
      ...modifiedData,
      {
        장소: element.station_nm,
        시간: element.time_div,
        온도: element.avg_temperature,
        습도: element.avg_humid,
        미세먼지: element.avg_pm25,
      },
    ];
  });

  let result = '';
  let column = '';

  for (let index in modifiedData[0]) {
    column += index + ',';
  }

  column = column.slice(0, -1);
  result += column + '\r\n';

  for (let i = 0; i < modifiedData.length; i++) {
    column = '';

    for (let index in modifiedData[i]) {
      column += modifiedData[i][index] + ',';
    }

    column = column.slice(0, -1);
    result += column + '\r\n';
  }

  const blob = new Blob(['\ufeff' + result], { type: 'text/csv;charset=utf8' });
  const csvUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('style', 'display:none');
  a.setAttribute('href', csvUrl);
  a.setAttribute('download', 'export.csv');
  document.body.appendChild(a);

  a.click();
  a.remove();
}
