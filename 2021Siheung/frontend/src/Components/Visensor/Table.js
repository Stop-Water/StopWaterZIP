import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import './CSS/Table.css';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="tableScrollX tableScrollY">
      <table className="basicTable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const TestTable = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: '관측 날짜',
        accessor: 'obs_date',
      },
      {
        Header: '관측 시간',
        accessor: 'obs_time',
      },
      {
        Header: '시정 거리',
        accessor: 'visibility',
      },
    ],
    []
  );

  let data = [];
  data = [...props.data];

  data.map((element) => {
    const year = element.obs_date.substring(0, 4);
    const month = element.obs_date.substring(4, 6);
    const day = element.obs_date.substring(6, 8);
    const hour = element.obs_time.substring(0, 2);
    const min = element.obs_time.substring(2, 4);

    element.obs_date = `${year}년 ${month}월 ${day}일`;
    element.obs_time = `${hour}시 ${min}분`;
    element.visibility = `${numberWithCommas(element.visibility)}m`;

    return null;
  });

  console.log('table rendered');
  return (
    <>
      <div className="tableContainer">
        <Table columns={columns} data={data}></Table>
      </div>
    </>
  );
};

export default React.memo(TestTable);
