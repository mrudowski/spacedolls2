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
    },
    hurtDoll: (state, action) => {
      const {dollId, attackStrength} = action.payload;
      const doll = state[dollId];
      doll.hp = attackStrength; // immer
    },
  }
});

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


const getDollById = id =>
  createSelector(
    [getDolls],
    dollsById => dollsById[id]
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
  getDollById,
};

// effects

const dealDamageToDoll = ({dollId, tileId, attackStrength}) =>
  (dispatch, getState) => {
    const doll = dolls.selectors.getDollById(dollId)(getState());
    const result = doll.hp - attackStrength;

    // over and over between board and dolls...
    // it should be one common reducers for it

    if (result > 0) {
      dispatch(dolls.actions.hurtDoll({
        dollId,
        attackStrength
      }));
    } else {
      dispatch(board.actions.removeDoll(tileId));
    }
  };

dolls.effects = {
  dealDamageToDoll,
};

export default dolls;
