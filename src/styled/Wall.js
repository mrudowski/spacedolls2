import styled /*, { css }*/ from 'styled-components';
// import { math } from 'polished';
import { tileBase, tileSize } from '../styled/common';

const Wall = styled.div`
  ${tileBase};
  ${tileSize};
  background-color: rgba(0, 0, 0, 0.5);
  
  > span {
    display: block;
    position: absolute;
    top: 4px;
    left: 5px;
    opacity: 0.85;
  }
`;

export default Wall;
