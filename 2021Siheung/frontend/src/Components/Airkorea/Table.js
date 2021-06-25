import React from 'react';
import { Table as VTable, Column, AutoSizer } from 'react-virtualized';

const Table = ({ name, data }) => {
  return (
    <div className="airWrap">
      <h2 className="ChartTit TitBtn">{name}</h2>
      {data.length === 0 ? (
        <div className="noData">환경공단에서 제공중인 데이터가 없습니다.</div>
      ) : (
        <div className="dataTable">
          <AutoSizer>
            {({ width }) => (
              <>
                <VTable
                  rowClassName="table-row"
                  headerHeight={55}
                  width={width}
                  height={550}
                  rowHeight={60}
                  rowCount={data.length}
                  rowGetter={({ index }) => data[index]}
                >
                  <Column
                    className="column"
                    label="시간"
                    dataKey="dataTime"
                    width={width + 400}
                  />
                  <Column
                    className="column"
                    label="초미세먼지(μg/㎥)"
                    dataKey="pm25Val"
                    width={width + 600}
                  />
                </VTable>
              </>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default Table;
