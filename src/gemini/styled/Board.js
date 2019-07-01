import styled from 'styled-components';

const Board = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  width: 202px;
  height: 202px;
  text-align: left;
  position: relative;
`;

export default Board;
