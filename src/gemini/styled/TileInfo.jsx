import styled from 'styled-components';
import colors from './colors';

const TileInfo = styled.div`
  border: 1px solid ${colors.border};
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  padding: 8px;
  position: absolute;
  top: 0;
  left: 208px;
`;

export default TileInfo;
