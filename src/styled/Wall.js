import styled, { css } from 'styled-components';
import { math } from 'polished';

const Wall = styled.div`
  position: absolute;
  width: ${props => props.theme.sizes.tileSize};
  height: ${props => props.theme.sizes.tileSize};
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  ${props => {
    // oh...
    return css`
      left: ${math(`${props.$x} * ${props.theme.sizes.tileSize}`)};
      top: ${math(`${props.$y} * ${props.theme.sizes.tileSize}`)};
    `;
  }}
`;

export default Wall;
