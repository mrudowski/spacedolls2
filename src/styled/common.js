import { css } from 'styled-components';
import { math } from 'polished';

export const tileBase = css`
  pointer-events: none;
  position: absolute;

  ${props => {
    // oh...
    return css`
      left: ${math(`${props.$x} * ${props.theme.sizes.tileSize}`)};
      top: ${math(`${props.$y} * ${props.theme.sizes.tileSize}`)};
    `;
  }}
`;

export const tileSize = css`
  ${props => {
    return css`
      width: ${props.theme.sizes.tileSize};
      height: ${props.theme.sizes.tileSize};
    `;
  }}
`;
