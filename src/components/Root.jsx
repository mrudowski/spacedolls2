import React from 'react';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'styled-components';
import App from './App';
import configureAppStore from '../redux/configureAppStore';
import theme from '../theme/theme';
import GlobalStyle from '../styled/GlobalStyle';

const store = configureAppStore();

const Root = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </React.Fragment>
  </ThemeProvider>
);

export default Root;
