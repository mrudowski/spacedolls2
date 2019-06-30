import styled from 'styled-components';
import colors from './colors';

const Board = styled.div`
  border: 1px solid ${colors.border};
  width: 202px;
  height: 202px;
  text-align: left;
  position: relative;
`;

export default Board;
