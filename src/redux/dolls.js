import { createSlice, createSelector } from 'redux-starter-kit';
import levelsDef from '../data/levels';
import dollsDef from '../data/dolls';
import level from './level';
import board from './board';

const dolls = createSlice({
  slice: 'dolls',
  initialState: {},
  reducers: {
    create: (state, action) => {
      const levelId = action.payload;
      const level = levelsDef[levelId];

      level.dolls.forEach(doll => {
        state[doll.id] = {
          id: doll.id,
          team: doll.team,
          meta: dollsDef[doll.id], // ref or selector?
          hp: dollsDef[doll.id].stats.hp
        };
      });
    }
  }
});

const { getDolls } = dolls.selectors;

// not used
// dolls.selectors.getDollById = id =>
//   createSelector(
//     [getDolls],
//     dolls => dolls[id]
//   );

dolls.selectors.getSelectedDollData = createSelector(
  [getDolls, board.selectors.getSelectedTile],
  (dolls, selectedTile) => {
    if (selectedTile && selectedTile.doll) {
      return dolls[selectedTile.doll];
    } else {
      return null;
    }
  }
);

// should be reducer doll.byId ???
// export const getDollTeam = (levelId, id) => {
//   console.log('>>', id, getLevel(levelId).dolls[3].team);
//   return getLevel(levelId).dolls[1].team;
// };

export default dolls;
