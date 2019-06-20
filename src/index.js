import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './brain/store';
import CounterComponent from './Counter';
import { FocusStyleManager } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './styles.scss';

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>SpaceDolls</h1>
        <h2>Start editing to see some magic happen!</h2>
        <CounterComponent />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
