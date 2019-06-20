import React from 'react';
import { Provider } from 'react-redux';
import store from './brain/store';
import CounterComponent from './Counter';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App bp3-dark">
        <h1>SpaceDolls</h1>
        <h2>Start editing to see some magic happen!</h2>
        <CounterComponent />
      </div>
    </Provider>
  );
}
