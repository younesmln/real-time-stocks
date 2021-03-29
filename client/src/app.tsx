import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import { Stocks } from './stock/Stocks';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Stocks />
    </Provider>
  );
}

export default App;
