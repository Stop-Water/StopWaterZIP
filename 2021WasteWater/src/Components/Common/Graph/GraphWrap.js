import React from 'react';
import GraphBox from './GraphBox';
const GraphWrap = ({ data, flag }) => {
  if (!data) return null;
  return (
    <>
      <div className="smallTitle">
        <div className="resultTitle">
          {flag === 'flux'
            ? '유량'
            : flag === 'quality'
            ? '수질'
            : flag === 'foulOder'
            ? '악취'
            : flag === 'wrong'
            ? '오측(이상범위값) 그래프'
            : flag === 'non'
            ? '데이터 수신누락 그래프'
            : ''}
        </div>
      </div>
      <div className="graphBox">
        <GraphBox data={data} flag={flag} />
      </div>
    </>
  );
};

export default GraphWrap;
