import { createSlice, createSelector } from 'redux-starter-kit';
import levels from '../../data/levels';
import dollsDef from '../../data/dolls';

const dolls = createSlice({
  slice: 'dolls',
  initialState: {
    byId: {},
    selectedId: null
  },
  reducers: {
    create: (state, action) => {
      const levelId = action.payload;
      const level = levels[levelId];

      level.dolls.forEach(doll => {
        state.byId[doll.id] = {
          id: doll.id,
          hp: dollsDef[doll.id].stats.hp
        };
      });
      console.log('state', state.byId);
    }
    // getSelected: (state, action) => action.payload,
  }
});

const { getDolls } = dolls.selectors;

// const getTabContent = createSelector(
//   [{ path: 'tabIndex', argIndex: 1 }],
//   tabIndex => {
//     // return value here
//   }
// )

dolls.selectors.getAllDolls = createSelector(
  ['dolls.byId']
  // [getDolls],
  // getDolls => {
  //   return getDolls.byId;
  // }
);

// dolls.selectors.getDollById = createSelector(
//[{ path: 'state.byId', argIndx: 1 }],
// (byId) => {
//console.log('->', byId, id);
//dolls[id]
// }
// (visibilityFilter, todos) => {
//   switch (visibilityFilter) {
//     case SHOW_ALL:
//       return todos;
//     case SHOW_COMPLETED:
//       return todos.filter(t => t.completed);
//     case SHOW_ACTIVE:
//       return todos.filter(t => !t.completed);
//     default:
//       throw new Error('Unknown filter: ' + visibilityFilter);
//   }
// }
// );

export default dolls;
