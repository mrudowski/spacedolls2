import { css } from 'styled-components';
import { math } from 'polished';

export const tileBase = css`
  pointer-events: none;
  position: absolute;

  ${props => css`
    left: ${math(`${props.$x} * ${props.theme.sizes.tileSize}`)};
    top: ${math(`${props.$y} * ${props.theme.sizes.tileSize}`)};
  `}
`;

export const tileSize = css`
  ${props => css`
    width: ${props.theme.sizes.tileSize};
    height: ${props.theme.sizes.tileSize};
  `}
`;
