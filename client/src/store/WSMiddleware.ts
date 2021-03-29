import { Action, Middleware } from 'redux';
import { RootState } from './types';
import { WebSocketAPI } from './stocks/WebSocketAPI';
import { FullState } from './stocks/types';
import { actions } from './stocks/stocksSlice';

const WSMiddleware: Middleware<
  {},
  RootState
> = (store) => (next) => {
  let socket: WebSocketAPI;

  return (action: Action) => {
    const actionReturn = next(action);

    if (action.type === 'stocks/fetchTickers/fulfilled') {
      
      const stocks = store.getState().stocks as FullState;

      if (!socket) {
        socket = new WebSocketAPI();
      }
      socket.unsubscribeFromTickers();

      const tickersSymbol = stocks.ids
      socket.subscribeToTickers(tickersSymbol, (data) => {
        next(actions.tickersPriceUpdate(data))
      });
    }

    return actionReturn;
  };
};

export default WSMiddleware;
