import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TickerService } from './ticker.service';
import { GetTickersPayload } from './dto/stock';

@Controller()
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get('tickers')
  getStocks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<GetTickersPayload> {
    return this.tickerService.getStocks(page, perPage);
  }
}
