import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

console.log('process',process.env);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
