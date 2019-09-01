import styled, { css } from 'styled-components';
import { math } from 'polished';

export const Board = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  text-align: left;
  position: relative;
	${props => css`
		width: ${math(`${props.$width} * ${props.theme.sizes.tileSize} + 2`)};
		height: ${math(`${props.$height} * ${props.theme.sizes.tileSize} + 2`)};
	`}
`;
