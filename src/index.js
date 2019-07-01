import React from 'react';
import ReactDOM from 'react-dom';
// import { FocusStyleManager } from '@blueprintjs/core';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import GlobalStyle from './gemini/styled/GlobalStyle';
import App from './gemini/App';

// import 'normalize.css/normalize.css';
// import '@blueprintjs/core/src/components/button/_button.scss';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import './scss/index.scss';

// FocusStyleManager.onlyShowFocusOnTabs();

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <App />
    </React.Fragment>
  </ThemeProvider>,
  rootElement
);
