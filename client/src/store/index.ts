import { configureStore, Middleware } from '@reduxjs/toolkit';
import stocksSlice from './stocks/stocksSlice';
import { RootState } from './types';
import WSMiddleware from './WSMiddleware';

const defaultMiddlewares = [WSMiddleware];

const createStore = ({
  middlewares,
}: {
  middlewares?: Middleware<{}, RootState>[];
} = {}) =>
  configureStore({
    reducer: {
      stocks: stocksSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares || defaultMiddlewares),
  });

export default createStore;
