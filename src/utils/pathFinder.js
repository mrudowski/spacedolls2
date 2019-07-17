import EasyStar from 'easystarjs';
import foreach from 'lodash/each';
import { getTileXFromId, getTileYFromId } from './tile';
import store from '../redux/store';

const easystar = new EasyStar.js();

const createGrid = tilesData => {
  const grid = [];
  // use selectors? // dep loop?
  const boardSize = 5; //store.getState().level

  for (let i = 0; i < boardSize; i++) {
    grid.push([]);
  }

  foreach(tilesData, (tile, tileId) => {
    grid[getTileYFromId(tileId)][getTileXFromId(tileId)] =
      tile.doll || tile.wall ? '1' : '0';
  });

  return grid;
};

export const prepareGrid = tilesData => {
  const grid = createGrid(tilesData);
  console.log('grid', grid);
  easystar.setGrid(grid);
  easystar.setAcceptableTiles(['0']);

  console.log('findPath...');
  easystar.findPath(2, 0, 2, 4, path => {
    if (path === null) {
      console.log('no found!');
    } else {
      console.log(
        'Path was found. The first Point is ' + path[0].x + ' ' + path[0].y,
        'path length',
        path.length,
        path
      );
    }
  });
  easystar.calculate();
};

//calculate in par?

export const calculatePath = (startX, startY, endX, endY) => {
  console.log('calculatePath', startX, startY, endX, endY);
  easystar.findPath(startX, startY, endX, endY, path => {
    if (path === null) {
      console.log('no found!');
    } else {
      console.log(
        'Path was found. The first Point is ' + path[0].x + ' ' + path[0].y
      );
    }
  });
  //calculate in parts?
  //easystar.calculate();
};
