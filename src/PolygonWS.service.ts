import { Injectable } from '@nestjs/common';
import * as faker from 'faker';

const UPDATES_TIMEOUT_DURATION = 1000 / 10;

@Injectable()
export class PolygonWSService {
  connect() {
    return {
      subscribe(symbols: string[], cb) {
        const id = setInterval(() => {
          const data = getNextRealTimeData(symbols);
          cb(data);
        }, UPDATES_TIMEOUT_DURATION);

        return function dispose() {
          clearInterval(id);
        };
      },
    };
  }
}

function getNextRealTimeData(symbols: string[]) {
  const randomSymbols = getRandomPair(symbols);

  const tradesPrices = randomSymbols.map((aSymbol) => ({
    sym: aSymbol,
    p: faker.commerce.price(),
  }));

  console.log(tradesPrices);

  return tradesPrices;
}

const getRandomPair = (array: string[]) =>
  [...array].sort(() => 0.5 - Math.random()).slice(0, 2);
