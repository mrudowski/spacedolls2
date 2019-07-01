import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CounterComponent from './Counter';
import Level from './Level';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App bp3-dark">
        <h1>SpaceDolls</h1>
        <CounterComponent />
        <hr />
        <Level />
      </div>
    </Provider>
  );
}
