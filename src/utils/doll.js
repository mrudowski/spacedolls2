import dollsData from '../data/dolls';

// for now this name, should be stats etc?
// use as delivered meta data or we rather put every received data to redux store?
export const getDollMetaData = dollId => dollsData[dollId];

export const getDollMove = dollId => getDollMetaData(dollId).stats.move;

export const getAttackRange = dollId => getDollMetaData(dollId).stats.attackRange;

export const getDollFromTile = tile => tile.dollId;


// tight couple with redux state structure that it should be selector...

export const getDataModel = doll => ({
  // get all props without function wrappers?
  ...doll,
  getAttackStrength: () => getDollMetaData(doll.id).stats.attackStrength,
  getFOD: () => getDollMetaData(doll.id).stats.FOD,
});
