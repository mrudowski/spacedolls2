import sizes from '../theme/sizes';
import { stripUnit } from 'polished';

export const tileSize = stripUnit(sizes.tileSize);
export const getTileCenter = point => point * tileSize + tileSize/2;