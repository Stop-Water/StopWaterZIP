import React from 'react';
import { useSelector } from 'react-redux';
import GraphWrap from './Graph/GraphWrap';
import TableWrap from './Table/TableWrap';

const SearchResult = ({ flag }) => {
  const {
    fluxData,
    foulOderData,
    tableData,
    nonData,
    wrongData,
    nonTableData,
    wrongTableData,
  } = useSelector((state) => ({
    fluxData: state.statistic.fluxData,
    foulOderData: state.statistic.foulOderData,
    tableData: state.statistic.tableData,
    nonData: state.adminStatistic.nonData,
    wrongData: state.adminStatistic.wrongData,
    nonTableData: state.adminStatistic.nonTableData,
    wrongTableData: state.adminStatistic.wrongTableData,
  }));

  return (
    <div className="SearchResultWrap">
      {flag === 'statistic' && (
        <>
          <GraphWrap data={fluxData} flag="flux" />
          <GraphWrap data={foulOderData} flag="foulOder" />
          <TableWrap data={tableData} flag="flux" />
          <TableWrap data={tableData} flag="foulOder" />
        </>
      )}
      {flag === 'adminData' && (
        <>
          <GraphWrap data={wrongData} flag="wrong" />
          <GraphWrap data={nonData} flag="non" />
          <TableWrap data={wrongTableData} flag="wrong" />
          <TableWrap data={nonTableData} flag="non" />
        </>
      )}
    </div>
  );
};

export default SearchResult;
