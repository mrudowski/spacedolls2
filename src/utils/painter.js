import { stripUnit } from 'polished';
import sizes from '../theme/sizes';

export const tileSize = stripUnit(sizes.tileSize);
export const getTileCenter = point => point * tileSize + tileSize/2;
