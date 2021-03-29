import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import * as API from '../../api';
import {
  FullState,
  State,
  TickerPriceUpdate,
  Ticker,
  TickerDTO,
} from './types';

const fetchTickersAction = createAsyncThunk(
  'stocks/fetchTickers',
  async (page: number = 1) => {
    const response = await API.fetchTickers(page);
    return response;
  },
);

export const counterSlice = createSlice<State, SliceCaseReducers<State>>({
  name: 'stocks',
  initialState: {
    loading: 'idle',
  },
  reducers: {
    // @ts-ignore
    tickersPriceUpdate: (
      { entities }: FullState,
      action: PayloadAction<TickerPriceUpdate[]>,
    ) => {
      action.payload.forEach((newPrice) => {
        const prevPrice = entities[newPrice.sym];

        const tickerPriceUpdate =  { name: prevPrice.name, symbol: newPrice.sym, price: newPrice.p }

        entities[newPrice.sym] = updateTicker(prevPrice, tickerPriceUpdate);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickersAction.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchTickersAction.rejected, (state) => {
      state.loading = 'error';
    });
    // @ts-ignore
    builder.addCase(
      fetchTickersAction.fulfilled,
      (state: FullState, action) => {
        const byId = action.payload.tickers.reduce<Record<string, Ticker>>(
          (byId, aTicker, _, tickers) => {
            byId[aTicker.ticker] = updateTicker(undefined, mapTicker(aTicker));
            return byId;
          },
          {},
        );

        const { perPage, count, page } = action.payload;

        return {
          ...state,
          loading: 'success',
          perPage,
          page,
          count,
          entities: byId,
          ids: Object.keys(byId),
        };
      },
    );
  },
});

function updateTicker(
  prevTicker: Ticker | undefined,
  currTicker: Ticker,
): Ticker {
  if (!prevTicker) return currTicker;

  const priceDiff = safeMinus(currTicker.price, prevTicker.price);
  const changeInPercentage = safeChangePercentage(
    currTicker.price,
    prevTicker.price,
  );

  return {
    ...prevTicker,
    price: currTicker.price,
    change: priceDiff,
    changeInPercentage,
  };
}


function mapTicker({ ticker, name }: TickerDTO): Ticker {
  return {
    symbol: ticker,
    name,
    price: undefined,
    change: undefined,
    changeInPercentage: undefined,
  };
}

function safeMinus(a?: number, b?: number) {
  if (!a || !b) return undefined;
  return a - b;
}

function safeChangePercentage(a?: number, b?: number) {
  if (!a || !b) return undefined;
  return (a - b) / b * 100;
}

export const actions = {
  tickersPriceUpdate: counterSlice.actions.tickersPriceUpdate,
  fetchTickers: fetchTickersAction,
};

export default counterSlice.reducer;
