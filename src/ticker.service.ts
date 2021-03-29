import { Injectable, Get, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetTickersPayload } from './dto/stock';

@Injectable()
export class TickerService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Get()
  async getStocks(page: number, perPage: number): Promise<GetTickersPayload> {
    const url = this.getAPIURL('tickers', { page, perPage });

    try {
      const response = await this.httpService
        .get<GetTickersPayload>(url)
        .toPromise();
      return response.data;
    } catch (e) {
      console.log(e);

      throw e;
    }
  }

  getAPIURL(
    path: string,
    { page, perPage }: { page: number; perPage: number },
  ) {
    const API_BASE_URL = this.configService.get<string>('POLYGON_BASE_API');
    const API_KEY = this.configService.get<string>('API_KEY');
    return `${API_BASE_URL}${path}?sort=ticker&perpage=${perPage}&page=${page}&apiKey=${API_KEY}`;
  }
}
