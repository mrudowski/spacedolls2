import styled, { css } from 'styled-components';

const Wall = styled.div`
  position: absolute;
  width: ${props => props.theme.sizes.tileSize}px;
  height: ${props => props.theme.sizes.tileSize}px;
  background-color: rgba(0, 0, 0, 0.5);
  left: ${props => props.posX * props.theme.sizes.tileSize}px;
  top: ${props => props.posY * props.theme.sizes.tileSize}px;
  /* ${props =>
    props.x &&
    css`
      top: props.x * 40px,
      left: props.y * 40px
    `} */
`;

export default Wall;
