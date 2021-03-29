import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/stocks/stocksSlice';
import { getTickersData } from '../store/stocks/selectors';
import Error from './Error';
import Loader from './Loader';
import StocksTable from './StocksTable';
import Pagination from './Pagination';

export function Stocks() {
  const dispatch = useDispatch();
  const data = useSelector(getTickersData);

  React.useEffect(() => {
    dispatch(actions.fetchTickers());
  }, [dispatch]);

  const fetchPage = useCallback(
    (page: number) => {
      dispatch(actions.fetchTickers(page));
    },
    [dispatch],
  );

  switch (data.loading) {
    case 'error':
      return (
        <Center>
          <Error message="error refresh please" />
        </Center>
      );
    case 'pending':
    case 'idle':
      return (
        <Center>
          <Loader />
        </Center>
      );
    case 'success':
      const { count, page, tickers, perPage } = data;

      return (
        <Center>
          <div className="flex flex-wrap content-center justify-center w-full">
            <StocksTable data={tickers} />
            <Pagination
              page={page}
              count={count}
              perPage={perPage}
              getPage={fetchPage}
            />
          </div>
        </Center>
      );
  }
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap content-center justify-center h-screen">
      <div className="lg:max-w-screen-lg md:max-w-full lg:max-w-screen-xl w-full flex content-center justify-center">
        {children}
      </div>
    </div>
  );
}
