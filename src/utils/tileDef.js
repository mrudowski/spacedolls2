import tilesDef from '../data/tilesDef';

export const WALL = 'wall';
// export const getTileData = tileType => tilesetData[tileType];
//
// export const getWallDef = () => {
// 	return getTileData('wall');
// };
//
// export const getDefFor = tileType => tilesetData[tileType];

export const getTitle = tileType => tilesDef[tileType].title;

export const getInitialStats = tileType => ({
	...tilesDef[tileType].stats
});

