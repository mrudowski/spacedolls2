import { createSlice, createSelector } from 'redux-starter-kit';

const actions = createSlice({
  slice: 'actions',
  initialState: {
    move: false,
    attack: false
  },
  reducers: {
    toggleMoveGizmo: state => {
      state.move = !state.move;
    },
    toggleAttackGizmo: state => {
      state.attack = !state.attack;
    },
    moveSelectedDollTo: (state, action) => {
      // better by selectors? if yes, then selector with board!

      // TODO!
      const sourceTile = state.tiles[state.selectedTileId];
      const destinationTile = state.tiles[action.payload];
      // change doll to dollId
      destinationTile.doll = sourceTile.doll;
      sourceTile.doll = null;
      state.selectedTileId = action.payload;
    }
  }
});

actions.selectors.isMoveGizmoActive = createSelector(['actions.move']);
actions.selectors.isAttackGizmoActive = createSelector(['actions.attack']);

export default actions;
