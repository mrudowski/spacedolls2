import React from 'react';
import styled, {css} from 'styled-components';
import { rgba, math } from 'polished';
import posed, {PoseGroup} from 'react-pose';
import sizes from '../theme/sizes';
import colors from '../theme/colors';
import { tileBase } from './common';

const dollSize = math(`${sizes.tileSize} - 8`);



const DollPosed = posed.div({
  // hidden: { opacity: 0.5 },
  // visible: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});


const Doll = styled(DollPosed)`
  ${tileBase};

  width: ${dollSize};
  height: ${dollSize};

  margin: 4px 0 0 4px;
  border-radius: 50%;

  background-color: ${props => (props.$team === 'dolls'
      ? rgba(colors.team.dolls, 0.4)
      : rgba(colors.team.aliens, 0.35)
  )};
  
  &:before {
    content: '';
    display: block;
    transition: all 0.25s ease-in-out;
    position: absolute;
    top: -5px;
    left: -5px;
    width: ${math(`${sizes.tileSize} + 2`)};
    height: ${math(`${sizes.tileSize} + 2`)};
    border: 1px solid ${rgba(colors.active, 0)};
    border-radius: 100%;
  }
  
  ${props => {
    if (props.$selected) {
      return css`
        &:before {
          top: -10px;
          left: -10px;
          width: ${math(`${sizes.tileSize} + 12`)};
          height: ${math(`${sizes.tileSize} + 12`)};
          border: 4px solid ${rgba(colors.active, 0.9)};
        }
    `;
		}
    return css``;
  }};
`;

export default Doll;
