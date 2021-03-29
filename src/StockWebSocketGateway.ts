import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PolygonWSService } from './PolygonWS.service';

@WebSocketGateway()
export class StockWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(StockWebSocketGateway.name);

  @WebSocketServer()
  server: Server;

  stream: ReturnType<PolygonWSService['connect']>;

  subscriptions = new WeakMap();

  constructor(private readonly polygonWSService: PolygonWSService) {}

  afterInit() {
    this.logger.log('Initialized');
    this.stream = this.polygonWSService.connect();
  }

  @SubscribeMessage('tickers')
  handleEvent(
    @MessageBody() { symbols }: { symbols: string[] },
    @ConnectedSocket() client: Socket,
  ) {
    this.cleanClientPrevSubscriptions(client);

    this.logger.log(`event: ${symbols.join(',')}`);

    const dispose = this.stream.subscribe(symbols, (data) => {
      client.emit('tickers', data);
    });

    this.subscriptions.set(client, dispose);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client} ${args}`);
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client} ${args}`);
    this.cleanClientPrevSubscriptions(client);
  }

  cleanClientPrevSubscriptions(client: Socket) {
    const storedDispose = this.subscriptions.get(client);

    if (storedDispose) {
      storedDispose();
      this.subscriptions.delete(client);
    }
  }
}
