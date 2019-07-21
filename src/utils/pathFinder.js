import EasyStar from 'easystarjs';
import forEach from 'lodash/each';
import * as tileUtil from './tile';
import store from '../redux/store';

const easystar = new EasyStar.js();
easystar.enableSync();
// easystar.setIterationsPerCalculation(1000);

const createGrid = tilesData => {
  const grid = [];
  // use selectors? // dep loop?
  const boardSize = 5; //store.getState().level

  for (let i = 0; i < boardSize; i++) {
    grid.push([]);
  }

  forEach(tilesData, (tile, tileId) => {
    const {x, y} = tileUtil.getXYFromId(tileId);
    // reversing order
    grid[y][x] =
      tile.doll || tile.wall ? '1' : '0';
  });

  return grid;
};

export const prepareGrid = tilesData => {
  const grid = createGrid(tilesData);
  console.log('preparedGrid', grid);
  easystar.setGrid(grid);
  easystar.setAcceptableTiles(['0']);
};

export const calculatePath = (startX, startY, endX, endY, callbackFunction) => {
  easystar.findPath(
    parseInt(startX, 10),
    parseInt(startY, 10),
    parseInt(endX, 10),
    parseInt(endY, 10),
    callbackFunction
  );
  easystar.calculate();
};
