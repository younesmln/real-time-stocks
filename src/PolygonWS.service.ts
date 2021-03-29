import { Injectable } from '@nestjs/common';
import * as faker from 'faker';

const UPDATES_TIMEOUT_DURATION = 1000 / 10;

@Injectable()
export class PolygonWSService {
  connect() {
    let id;

    function dispose() {
      clearInterval(id);
    }

    return {
      subscribe(symbols: string[], cb) {
        id = setInterval(() => {
          const data = getNextRealTimeData(symbols);
          cb(data);
        }, UPDATES_TIMEOUT_DURATION);

        return dispose;
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
