import styled from 'styled-components';
import colors from './colors';

const Tile = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;

  .coordinates {
    display: block;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }
`;

export default Tile;
