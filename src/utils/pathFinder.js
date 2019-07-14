import EasyStar from 'easystar';
import foreach from 'lodash/each';
import { getTileXFromId, getTileYFromId } from './utils';

const easystar = new EasyStar.js();

const createGrid = (tilesData, boardSize) => {
  const grid = [];

  for (let i = 0; i < boardSize.height; i++) {
    grid.push([]);
  }

  foreach(tilesData, (tile, tileId) => {
    grid[getTileXFromId(tileId)][getTileYFromId(tileId)] =
      tile.doll || tile.wall ? 0 : 1;
  });

  return grid;
};

export const prepareGrid = tilesData => {
  const grid = createGrid(tilesData);
  easystar.setGrid(grid);
  easystar.setAcceptableTiles(arrayOfAcceptableTiles);
};

export const calculatePath = ({ startX, startY, endX, endY, callback }) => {
  easystar.findPath(startX, startY, endX, endY, callback);
  easystar.calculate();
};
