import { createSlice, createSelector } from 'redux-starter-kit';
import levelsDef from '../data/levels';
import dollsDef from '../data/dolls';
import level from './level';
import { getBoardData } from './board/selectors';

const dolls = createSlice({
  slice: 'dolls',
  initialState: {
    byId: {},
    selectedId: null
  },
  reducers: {
    create: (state, action) => {
      const levelId = action.payload;
      const level = levelsDef[levelId];

      level.dolls.forEach(doll => {
        state.byId[doll.id] = {
          id: doll.id,
          team: doll.team,
          meta: dollsDef[doll.id], // ref? or selector
          hp: dollsDef[doll.id].stats.hp
        };
      });
      console.log('state', state.byId);
    }
    // getSelected: (state, action) => action.payload,
  }
});

const { getDolls } = dolls.selectors;

dolls.selectors.getAllDolls = createSelector(['dolls.byId']);

dolls.selectors.getDollById = id =>
  createSelector(
    [getDolls],
    dolls => {
      console.log('getDollById', id);
      return dolls.byId[id];
    }
  );

// should be reducer doll.byId ???
// export const getDollTeam = (levelId, id) => {
//   console.log('>>', id, getLevel(levelId).dolls[3].team);
//   return getLevel(levelId).dolls[1].team;
// };

dolls.selectors.getSelectedDollData = createSelector(
  [getDolls, level.selectors.getLevel, getBoardData],
    (dolls, level, board) => {
      const tileId = level.selectedTileId;
      console.log('>>>',dolls,level,board);
      if (board && board[tileId] && board[tileId].doll) {
        return dolls.byId[board[tileId].doll];
      } else {
        return null;
      }
    }
);

export default dolls;
