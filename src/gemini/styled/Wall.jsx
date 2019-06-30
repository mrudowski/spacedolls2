import styled, { css } from 'styled-components';
import sizes from './sizes';

const Wall = styled.div`
  position: absolute;
  width: ${sizes.tileSize}px;
  height: ${sizes.tileSize}px;
  background-color: rgba(0, 0, 0, 0.5);
  left: ${props => props.posX * sizes.tileSize}px;
  top: ${props => props.posY * sizes.tileSize}px;
  /* ${props =>
    props.x &&
    css`
      top: props.x * 40px,
      left: props.y * 40px
    `} */
`;

export default Wall;
