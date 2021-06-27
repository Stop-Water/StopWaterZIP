import React from 'react';
import { useSelector } from 'react-redux';
import './scss/Dashboard.scss';
import DashboardCard from './DashboardCard';
import GraphWrap from '../Common/Graph/GraphWrap';
import CardItemContainer from './CardItemContainer';
import TableWrap from '../Common/Table/TableWrap';

const DashboardSection = ({ name, cardItem, index, data, flag }) => {
  const {
    fluxData,
    qualityData,
    foulOderData,
    fluxTBData,
    qualityTBData,
    foulOderTBData,
  } = useSelector((state) => ({
    fluxData: state.dashBoard.fluxRTData,
    qualityData: state.dashBoard.qualityRTData,
    foulOderData: state.dashBoard.foulOderRTData,
    fluxTBData: state.dashBoard.fluxTBData,
    qualityTBData: state.dashBoard.qualityTBData,
    foulOderTBData: state.dashBoard.foulOderTBData,
  }));

  return (
    <div className={`dashboard dashboard${index}`}>
      <div className="smallTitle">{name}</div>
      <CardItemContainer name={name}>
        {cardItem.map((item, _index) => (
          <DashboardCard
            name={item.name}
            key={_index}
            value={data[item.id]}
            unit={item.unit}
          />
        ))}
      </CardItemContainer>
      <GraphWrap
        flag={flag + 'RT'}
        data={
          flag === 'flux'
            ? fluxData
            : flag === 'quality'
            ? qualityData
            : foulOderData
        }
      />
      <TableWrap
        flag={flag + 'TB'}
        data={
          flag === 'flux'
            ? fluxTBData
            : flag === 'quality'
            ? qualityTBData
            : foulOderTBData
        }
      />
    </div>
  );
};

export default DashboardSection;
