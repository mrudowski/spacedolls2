import { createSlice, createSelector } from 'redux-starter-kit';
import * as levelUtil  from '../utils/level';
import * as dollUtil from '../utils/doll';
import board from './board';

const dolls = createSlice({
  slice: 'dolls',
  initialState: {},
  reducers: {
    create: (state, action) => {
      // TODO should be based on redux state levelId
      const levelId = action.payload;
      const level = levelUtil.getLevel(levelId);

      level.dolls.forEach(doll => {
        state[doll.id] = {
          id: doll.id,
          team: doll.team,
          // TODO remove meta data
          meta: dollUtil.getDollMetaData(doll.id), // ref or as util only?
          hp: dollUtil.getDollMetaData(doll.id).stats.hp
        };
      });
    }
  }
});

// not used
// dolls.selectors.getDollById = id =>
//   createSelector(
//     [getDolls],
//     dolls => dolls[id]
//   );

// export const getDollTeam = (levelId, id) => {
//   console.log('>>', id, getLevel(levelId).dolls[3].team);
//   return getLevel(levelId).dolls[1].team;
// };

// selectors

const {getDolls} = dolls.selectors;

const getSelectedDollId = createSelector(
  [board.selectors.getSelectedTile],
  selectedTile => {
    if (selectedTile && selectedTile.dollId) {
      return selectedTile.dollId;
    }
    return null;
  }
);

const getSelectedDoll = createSelector(
  [getDolls, getSelectedDollId],
  (dollsById, dollId) => {
    if (dollId) {
      return dollsById[dollId];
    }
    return null;
  }
);

const getSelectedDollDM = createSelector(
  [getSelectedDoll],
  (selectedDoll) => {
    if (selectedDoll) {
      return dollUtil.getDataModel(selectedDoll);
    }
    return null;
  }
);

// const getDollDM = createSelector(
//   [getDoll],
//   (dollsById, dollId) => {
//     if (dollId) {
//       return dollsById[dollId];
//     }
//     return null;
//   }
// );

dolls.selectors = {
  getDolls, // overwrite?
  getSelectedDollId,
  getSelectedDoll, // getActive
  getSelectedDollDM,
};

export default dolls;
