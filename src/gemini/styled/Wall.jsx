import styled, { css } from 'styled-components';
import colors from './colors';

const Wall = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  top: ${props => props.posX * 40}px;
  left: ${props => props.posY * 40}px;
  /* ${props =>
    props.x &&
    css`
      top: props.x * 40px,
      left: props.y * 40px
    `} */
`;

export default Wall;
