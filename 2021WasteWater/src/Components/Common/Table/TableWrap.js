import React from 'react';
import TableBox from './TableBox';

const TableWrap = ({ data, flag }) => {
  let _data;

  if (!data) return null;

  if (flag === 'flux') {
    _data = data.flux;
  } else if (flag === 'foulOder') {
    _data = data.bsml;
  } else {
    _data = data;
  }

  return (
    <>
      {flag.substring(flag.length - 2, flag.length) === 'TB' ||
      flag === 'sensor' ? (
        <></>
      ) : (
        <div className="smallTitle">
          <div className="resultTitle">
            {flag === 'flux'
              ? '유량'
              : flag === 'foulOder'
              ? '악취'
              : flag === 'user'
              ? '사용자 목록'
              : flag === 'wrong'
              ? '오측(이상범위값) 표'
              : '데이터 수신누락 표'}
          </div>
          <div className="excelIcon">
            <svg viewBox="0 0 22.503 20.746">
              <g transform="translate(-1837.497 -1186.833)">
                <path
                  d="M1006.442,552.836v-.247a.91.91,0,0,0-.339-.685l-3.73-3.97a1.288,1.288,0,0,0-.822-.283h-.293v5.185h5.184Z"
                  transform="translate(849.611 639.186)"
                />
                <path
                  d="M1000.6,562.62a1.808,1.808,0,0,1,1.659-1.106h1.328v-2.058a1.823,1.823,0,0,1,1.806-1.84h1.044v-3.483h-5.573a1.079,1.079,0,0,1-1.159-.971v-5.511H989.048a1.08,1.08,0,0,0-1.162.974v18.794a1.079,1.079,0,0,0,1.162.971h15.511l-3.588-3.75A1.863,1.863,0,0,1,1000.6,562.62Zm-3.72,3.936-1.847-3.258-1.79,3.258H990.2l3.2-5.4-2.964-4.975h3.178L995.2,559.1l1.637-2.922h3.045l-3.1,5.065,3.214,5.309Z"
                  transform="translate(849.611 639.186)"
                />
                <path
                  d="M1009.767,562.7h-2.515v-3.249a.636.636,0,0,0-.619-.652H1005.4a.635.635,0,0,0-.618.652V562.7h-2.516a.655.655,0,0,0-.434,1.113l3.724,3.885a.628.628,0,0,0,.46.2.645.645,0,0,0,.464-.2l3.723-3.885a.655.655,0,0,0-.434-1.113Z"
                  transform="translate(849.611 639.186)"
                />
              </g>
            </svg>
          </div>
        </div>
      )}
      <div className="tableBox">
        <TableBox data={_data} flag={flag} />
      </div>
    </>
  );
};

export default TableWrap;
