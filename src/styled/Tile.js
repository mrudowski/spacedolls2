import styled, { css } from 'styled-components';
import { rgba, math } from 'polished';
import colors from '../theme/colors';
import sizes from '../theme/sizes';
import { tileSize } from './common';

const Tile = styled.div`
	${tileSize};

	line-height: ${sizes.tileSize};
	text-align: center;
	display: inline-block;
	cursor: pointer;
	position: relative;
	
	&:nth-child(odd) {
		background-color: ${rgba(colors.white, 0.04)};;
	}

	
	.hover {
		position: absolute;

		// top: -2px;
		// left: -2px;
		// border-radius: 100%;
		// width: ${math(`${sizes.tileSize} + 4`)};
		// height: ${math(`${sizes.tileSize} + 4`)};
		// border: 1px solid ${rgba(colors.active, 0.5)};

		top: 0;
		left: 0;
		width: ${sizes.tileSize};
		height: ${sizes.tileSize};
		border: 1px solid ${colors.hover};
		opacity: 0.6;
		transition: opacity 0.15s ease-in-out;

		display: none;
		z-index: 1;
		
		&:before {
			content: '';
			position: absolute;
			top: -3px;
			left: -3px;
			width: 5px;
			height: 5px;
			background-color: ${colors.hover};
		}
		
		&:after{
			content: '';
			position: absolute;
			top: -3px;
			right: -3px;
			width: 5px;
			height: 5px;
			background-color: ${colors.hover};
		}
		
		span:before {
			content: '';
			position: absolute;
			bottom: -3px;
			left: -3px;
			width: 5px;
			height: 5px;
			background-color: ${colors.hover};
		}
		
		span:after{
			content: '';
			position: absolute;
			bottom: -3px;
			right: -3px;
			width: 5px;
			height: 5px;
			background-color: ${colors.hover};
		}

	}

	${props =>
		(!props.$selected || !props.$hasDoll) &&
		css`
				&:hover .hover {
					display: block;
				}
			`
	}

	${props =>
		(props.$selected && !props.$hasDoll) &&
		css`
			.hover {
				display: block;
				opacity: 1;
				// top: -6px;
				// left: -6px;
				// width: ${math(`${sizes.tileSize} + 12`)};
				// height: ${math(`${sizes.tileSize} + 12`)};
				// border: 2px solid ${rgba(colors.active, 1)};
				// border-radius: 100%;
			}
		`}

	.coordinates {
		display: block;
		font-size: 10px;
		color: rgba(255, 255, 255, 0.4);
	}
`;

export default Tile;
