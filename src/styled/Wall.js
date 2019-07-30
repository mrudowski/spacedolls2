import styled /*, { css }*/ from 'styled-components';
// import { math } from 'polished';
import { tileBase, tileSize } from '../styled/common';

const Wall = styled.div`
  ${tileBase}
  ${tileSize}
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Wall;
