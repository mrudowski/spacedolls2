import { createGlobalStyle } from 'styled-components';
// import { normalize } from 'styled-normalize';
// import reset from 'styled-reset';
import reboot from 'styled-reboot';
import colors from '../theme/colors';

const rebootOptions = {
  fontSizeBase: '12px', //1rem
  lineHeightBase: 1.3333333333, //1.5
  bodyColor: '#fff',
  bodyBg: colors.dark,
  headingsMarginBottom: '0',
  paragraphMarginBottom: '1rem',
  labelMarginBottom: '0',
  linkColor: '#E91E63',
  linkDecoration: 'none',
  linkHoverColor: '#E91E63',
  linkHoverDecoration: 'underline',
  tableCellPadding: '0.75rem',
  textMuted: '#6c757d'
};

const rebootCss = reboot(rebootOptions);

const GlobalStyle = createGlobalStyle`
  ${rebootCss}

  body {
  }
`;

export default GlobalStyle;
