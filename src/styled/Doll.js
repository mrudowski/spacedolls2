import styled from 'styled-components';
import { rgba, math } from 'polished';
import sizes from '../theme/sizes';
import colors from '../theme/colors';
import { tileBase } from '../styled/common';

const dollSize = math(`${sizes.tileSize} - 8`);

const Doll = styled.div`
  ${tileBase}

  width: ${dollSize};
  height: ${dollSize};

  margin: 4px 0 0 4px;
  border-radius: 50%;

  background-color: ${props => {
    return props.$team === 'dolls'
      ? rgba(colors.team.dolls, 0.25)
      : rgba(colors.team.aliens, 0.25);
  }};
`;

export default Doll;
