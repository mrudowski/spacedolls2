import styled, { css } from 'styled-components';
import colors from '../theme/colors';
import sizes from '../theme/sizes';
import { rgba, math } from 'polished';
import { tileBase, tileSize } from '../styled/common';

export const StyledMoveGizmo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: ${rgba('#000', 0.25)};
  pointer-events: none;
`;

export const StyledGizmoTile = styled.div`
  ${tileBase}
  ${tileSize}

  background-color: ${rgba('#ffe200', 0.3)};
`;
