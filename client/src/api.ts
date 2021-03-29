import { TickerDTO } from './store/stocks/types';

export type GetTickersPayload = {
  page: number;
  perPage: number;
  count: number;
  tickers: TickerDTO[];
};

export function fetchTickers(page: number): Promise<GetTickersPayload> {
  console.log(page);
  
  return HTTPClient('tickers', undefined, { page });
}

function HTTPClient(
  endpoint: string,
  { body, ...customConfig }: Record<string, any> = {},
  queryParams: Record<string, any> = {},
) {
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]),
    )
    .join('&');
  const url = `http://${process.env.REACT_APP_API_URL}${endpoint}${
    queryString ? `?${queryString}` : ''
  }`;

  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return window.fetch(url, config).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
