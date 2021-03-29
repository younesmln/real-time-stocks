export type TickerDTO = {
  ticker: string;
  name: string;
};

export type TickerPriceUpdate = {
  sym: string;
  p: number;
};

export type EmptyState = {
  loading: 'idle' | 'pending' | 'error';
};

export type Ticker = {
  symbol: string,
  name: string,
  price?: number,
  change?: number,
  changeInPercentage?: number
};

export type FullState = {
  loading: 'success';
  entities: Record<string, Ticker>;
  ids: string[];
  page: number;
  count: number;
  perPage: number;
};

export type State = EmptyState | FullState;
