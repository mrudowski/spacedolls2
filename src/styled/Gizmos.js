import styled, {css} from 'styled-components';
import { math, rgba } from 'polished';
import colors from '../theme/colors';
import sizes from '../theme/sizes';
import zIndex from '../theme/zIndex';
import { tileBase, tileSize } from './common';

export const StyledGizmo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: ${rgba('#000', 0.25)};
  pointer-events: none;
`;

export const StyledDevGizmo = styled(StyledGizmo)`
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 1px dashed ${colors.gizmos.dev}
  z-index: ${zIndex.dev}
`;

export const StyledGizmoTile = styled.div`
  ${tileBase}
  ${tileSize}
  pointer-events: auto;
  cursor: pointer;
  border: 1px solid ${colors.gizmos.dev};
  opacity: 0;

  :hover {
  opacity: 0.85;
  }
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
  //background-color: ${colors.gizmos.attack};
  opacity: 0.85;

  border-right: ${props => (
    props.$borderRight
    ? `1px dashed ${colors.gizmos.attack}` 
    : '0 none'
  )};
  border-bottom: ${props => (
    props.$borderBottom
    ? `1px dashed ${colors.gizmos.attack}` 
    : '0 none'
  )};
  border-left: ${props => (
    props.$borderLeft 
    ? `1px dashed ${colors.gizmos.attack}` 
    : '0 none'
  )};
  border-top: ${props => (
    props.$borderTop 
    ? `1px dashed ${colors.gizmos.attack}` 
    : '0 none'
  )};

  cursor: pointer;
  
  // :hover {
  //   opacity: 0.5;
  // 	// background-color: ${rgba(colors.gizmos.attack, 0.6)};
  // }
`;

export const StyledFODGizmoTile = styled.div`
  ${tileBase}
  ${tileSize}

  background-color: ${colors.gizmos.attack};
  opacity: ${props => props.$damage};
  
  // :before {
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
  
`;

const styledSvgGizmo = css`
  ${props => css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${math(`${props.$boardSize.width} * ${sizes.tileSize}`)};
  height: ${math(`${props.$boardSize.height} * ${sizes.tileSize}`)};
  stroke-width: 1;
  stroke-dasharray: 5 5;
  z-index: ${zIndex.LOF};
  `}
`;

export const StyledLOFGizmo = styled.svg`
  ${styledSvgGizmo};
  stroke: ${rgba(colors.gizmos.LOF, 1)};
`;


export const StyledPathGizmo = styled.svg`
  ${styledSvgGizmo};
  stroke: ${rgba(colors.gizmos.path, 1)};
  fill: none;
`;
