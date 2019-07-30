import dollsData from '../data/dolls';
import store from '../redux/store';
import dolls from '../redux/dolls';

export const getDollMetaData = dollId => dollsData[dollId];

// can we do that? //circular dependency ?
export const getSelectedDollId = () => {
  const state = store.getState();
  return dolls.selectors.getSelectedDollId(state);
};

// for now this name, should be stats etc?
export const getDollMove = dollId => {
  return getDollMetaData(dollId).stats.move;
};
