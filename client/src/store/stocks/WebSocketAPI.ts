import io from 'socket.io-client';
import { TickerPriceUpdate } from './types';

export class WebSocketAPI {
  private socket: SocketIOClient.Socket;
  isConnected: boolean = false;
  deferedJob?: () => void;

  constructor() {
    const url = `ws://${process.env.REACT_APP_API_URL}`;
    this.socket = io(url);

    this.socket.on('connect', () => {
      console.log('websocket connect');
      this.isConnected = true;
      
      this.deferedJob && this.deferedJob();
    });

    this.socket.on('error', (data: any) => {
      console.log('websocket error');

      this.isConnected = false;
      this.unsubscribeFromTickers();
    });
  }

  subscribeToTickers(symbols: string[], callback: (data: TickerPriceUpdate[]) => void) {
    const afterConnectCallback =  () => {
      this.socket.on('tickers', (data: TickerPriceUpdate[]) => {
        callback(data);
      });

      this.socket.emit('tickers', { symbols });
    };

    if (this.isConnected) {
      afterConnectCallback();
    } else {
      this.deferedJob = afterConnectCallback
    }
  }

  unsubscribeFromTickers() {
    if (this.socket && this.isConnected) {
      this.deferedJob = undefined;
      this.socket.removeEventListener('tickers');
    }
  }
}
