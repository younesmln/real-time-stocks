import { HttpModule, Module } from '@nestjs/common';
import { TickerController } from './tickers.controller';
import { ConfigModule } from '@nestjs/config';
import { TickerService } from './ticker.service';
import { StockWebSocketGateway } from './StockWebSocketGateway';
import { PolygonWSService } from './PolygonWS.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [TickerController],
  providers: [TickerService, StockWebSocketGateway, PolygonWSService],
})
export class AppModule {}
