import { createSelector } from 'reselect';
import { RootState } from '../types';
import { EmptyState } from './types';

export const getTickersData = createSelector(
  (state: RootState) => state.stocks,
  (stocks) => {
    if (stocks.loading !== 'success') {
      const loadingReturn: EmptyState =   {
        loading: stocks.loading,
      }

      return loadingReturn
    }

    const { page, count, entities, ids, perPage } = stocks;

    const tickers = ids.map((aTickerSymbol) => {
      const aTicker = entities[aTickerSymbol];
      return aTicker
    })

    return {
      loading: stocks.loading,
      tickers,
      page,
      count,
      perPage
    };
  },
);

export const getTickersPagination = createSelector(
  (state: RootState) => state,
  (state) => {
    return {
      total: state.stocks.loading,
    };
  },
);
