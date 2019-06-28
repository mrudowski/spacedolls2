import React from 'react';
import ReactDOM from 'react-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import App from './gemini/App'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css';
import './scss/index.scss';

FocusStyleManager.onlyShowFocusOnTabs();

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
