import React, { ReactNode } from 'react';
import { Row, useTable } from 'react-table';
import { Ticker } from '../store/stocks/types';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const defaultColumns = [
  {
    Header: 'Symbol',
    accessor: 'symbol',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Price',
    accessor: (row: Ticker) => row.price && formatter.format(row.price),
  },
  {
    Header: 'Change',
    accessor: (row: Ticker) =>
      row.change && (
        <PriceChangeColor value={row.change}>
          {formatter.format(row.change)}
        </PriceChangeColor>
      ),
  },
  {
    Header: '% change',
    accessor: (row: Ticker) =>
      row.changeInPercentage && (
        <PriceChangeColor value={row.changeInPercentage}>
          {(row.changeInPercentage / 100).toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 0,
          })}
        </PriceChangeColor>
      ),
  },
];

type Props = {
  data: Ticker[];
  columns?: typeof defaultColumns;
};

function StocksTable({ data, columns = defaultColumns }: Props) {
  //@ts-ignore
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table {...getTableProps()} className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className:
                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap text-center',
                    })}
                    scope="col"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            {...getTableBodyProps({
              className: 'bg-white divide-y divide-gray-200',
            })}
          >
            {rows.map((row) => {
              prepareRow(row);
              return <TableRow key={row.id} row={row} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableRow: React.FC<{ row: Row<Ticker> }> = React.memo(({ row }) => {
  return (
    <tr
      {...row.getRowProps({ className: 'h-8dd' })}
      data-testid={`row-${row.original.symbol}`}
    >
      {row.cells.map((cell) => (
        <td
          {...cell.getCellProps({
            className:
              'px-6 py-4 overflow-ellipsis overflow-hidden text-center',
          })}
        >
          {cell.render('Cell')}
        </td>
      ))}
    </tr>
  );
});

function PriceChangeColor({
  value = 0,
  children,
}: {
  value?: number;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block w-8 ${
        value < 0 ? 'text-red-500' : 'text-green-500'
      }`}
    >
      {value && children}
    </span>
  );
}

export default React.memo(StocksTable);
