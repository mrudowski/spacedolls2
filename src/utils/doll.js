import dollsData from '../data/dolls';

export const getDollMetaData = dollId => dollsData[dollId];

// for now this name, should be stats etc?
export const getDollMove = dollId => getDollMetaData(dollId).stats.move;

export const getAttackRange = dollId => getDollMetaData(dollId).stats.attackRange;

export const getDollFromTile = tile => tile.dollId;
