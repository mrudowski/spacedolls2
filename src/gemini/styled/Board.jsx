import styled from 'styled-components';
import colors from './colors';

const Board = styled.div`
  border: 1px solid ${colors.border};
  width: 200px;
  height: 200px;

  div {
    display: inline-block;
  }
`;

export default Board;
