import styled, { css } from 'styled-components';
import colors from '../theme/colors';
import sizes from '../theme/sizes';
import { rgba, math } from 'polished';
import { tileSize } from '../styled/common';

const Tile = styled.div`
  ${tileSize}

  line-height: ${sizes.tileSize};
  text-align: center;
  display: inline-block;
  cursor: pointer;
  position: relative;
  
  &:nth-child(odd) {
  	background-color: ${rgba(colors.white, 0.04)};;
  }

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 100%;
    width: ${math(`${sizes.tileSize} + 4`)};
    height: ${math(`${sizes.tileSize} + 4`)};
    border: 1px solid ${rgba(colors.active, 0.5)};
    transition: all 0.1s ease-in-out;
    display: none;
    z-index: 1;
  }

  &:hover:before {
    display: block;
  }

  ${props =>
    props.$selected &&
    css`
      &:before {
        display: block;
        top: -6px;
        left: -6px;
        width: ${math(`${sizes.tileSize} + 12`)};
        height: ${math(`${sizes.tileSize} + 12`)};
        border: 2px solid ${rgba(colors.active, 1)};
      }
    `}

  .coordinates {
    display: block;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }
`;

export default Tile;
