import styled from 'styled-components';

const TileInfo = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  padding: 8px;
  position: absolute;
  top: 0;
  left: 408px;
`;

export default TileInfo;
