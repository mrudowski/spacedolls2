import styled from 'styled-components';
import colors from '../theme/colors';
import sizes from '../theme/sizes';
import { math, rgba } from 'polished';
import { tileBase, tileSize } from '../styled/common';

export const StyledGizmo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: ${rgba('#000', 0.25)};
  pointer-events: none;
`;

// TODO OPTIMIZATION NEEDED?
// close to 100 tiles with the same styles
// only top and bottom is different

export const StyledMoveGizmoTile = styled.div`
  ${tileBase}
  ${tileSize}
  pointer-events: auto; // overwrite tileBase
  background-color: ${colors.gizmos.move};
  opacity: 0.3;
  cursor: pointer;

  :hover {
    opacity: 0.4;
  }
`;

// TODO OPTIMIZATION NEEDED?
// close to 100 tiles with the same styles
// only top and bottom is different

export const StyledAttackGizmoTile = styled.div`
  ${tileBase}
  ${tileSize}
  pointer-events: auto; // overwrite tileBase
  // background-color: ${rgba(colors.gizmos.attack, 0.25)};
  background-color: ${colors.gizmos.attack};
  opacity: 0.2;

	// border-right: ${props => props.$borderRight ? `1px solid ${colors.gizmos.attack}` : '0 none'};
	// border-bottom: ${props => props.$borderBottom ? `1px solid ${colors.gizmos.attack}` : '0 none'};
	// border-left: ${props => props.$borderLeft ? `1px solid ${colors.gizmos.attack}` : '0 none'};
	// border-top: ${props => props.$borderTop ? `1px solid ${colors.gizmos.attack}` : '0 none'};

	cursor: pointer;

	// :hover:before {
	// 	content: '';
	// 	position: absolute;
	// 	display: block;
	// 	top: -6px;
	// 	left: -6px;
	// 	width: ${math(`${sizes.tileSize} + 12`)};
	// 	height: ${math(`${sizes.tileSize} + 12`)};
	// 	border: 2px solid ${rgba(colors.white, 1)};
	// 	border-radius: 50%;
	// 	z-index: 1;
	// }
	
	:hover {
	  opacity: 0.5;
		// background-color: ${rgba(colors.gizmos.attack, 0.6)};
	}
`;
