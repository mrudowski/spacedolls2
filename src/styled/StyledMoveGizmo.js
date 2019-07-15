import styled, { css } from 'styled-components';
import colors from '../theme/colors';
import sizes from '../theme/sizes';
import { rgba, math } from 'polished';

// TODO: shared styles
export const StyledMoveGizmo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: ${rgba('#000', 0.25)};
  pointer-events: none;
`;

// common with Wall tile, doll etc
export const StyledGizmoTile = styled.div`
  position: absolute;
  width: ${props => props.theme.sizes.tileSize};
  height: ${props => props.theme.sizes.tileSize};
  background-color: ${rgba('#ffe200', 0.3)};
  pointer-events: none;
  ${props => {
    // oh...
    return css`
      left: ${math(`${props.$x} * ${props.theme.sizes.tileSize}`)};
      top: ${math(`${props.$y} * ${props.theme.sizes.tileSize}`)};
    `;
  }}
`;
