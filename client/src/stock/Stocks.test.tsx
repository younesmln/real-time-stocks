import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Stocks } from './Stocks';
import createStore from '../store';
import * as API from '../api';

const dummyTickersResponse = {
  page: 1,
  perPage: 10,
  count: 35,
  tickers: [
    {
      ticker: 'A',
      name: 'company A',
    },
    {
      ticker: 'B',
      name: 'company B',
    },
  ],
};

describe('Stocks', () => {
  it('shows the right pagination result', async () => {
    // @ts-ignore
    API.fetchTickers = jest.fn().mockResolvedValue(dummyTickersResponse);
    const store = createStore({ middlewares: [] });

    const $ = render(
      <Provider store={store}>
        <Stocks />
      </Provider>,
    );

    expect($.getByTestId('loader')).not.toBeNull();

    const elem = await waitFor(() => $.getByTestId('pagination-result'));
    expect(elem.textContent).toBe(`Showing 1 to 10 of 35 results`);
  });

  it('shows the right price and change', async () => {
    // @ts-ignore
    API.fetchTickers = jest.fn().mockResolvedValue(dummyTickersResponse);
    const store = createStore({ middlewares: [] });

    const $ = render(
      <Provider store={store}>
        <Stocks />
      </Provider>,
    );

    await waitFor(() => $.getByTestId('pagination-result'));

    const [firstTicker, secondTicker] = dummyTickersResponse.tickers;

    expect($.getByTestId(`row-${firstTicker.ticker}`)).not.toBeNull();
    expect($.getByTestId(`row-${secondTicker.ticker}`)).not.toBeNull();
    expect(
      $.getByTestId(`row-${firstTicker.ticker}`).parentNode?.children.length,
    ).toBe(2);
  });
});
