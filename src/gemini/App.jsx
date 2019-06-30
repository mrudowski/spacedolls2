import React from 'react';
import { Provider } from 'react-redux';
import store from './brain/store';
import CounterComponent from './Counter';
import Board from './Board';
import TileInfo from './TileInfo';
import levels from '../data/levels';

let currentLevel = '1';
let selectedTile = '0,0';

const getTileX = (board, tileId) => tileId % board.size.width;
const getTileY = (board, tileId) => Math.floor(tileId / board.size.height);
const getTileId = (x, y) => `${x},${y}`;

const getLevelData = level => {
  const board = levels[level];
  const boardSize = board.size.width * board.size.height;

  const tiles = {};
  for (let i = 0; i < boardSize; i++) {
    const x = getTileX(board, i);
    const y = getTileY(board, i);
    const id = getTileId(x, y);
    tiles[id] = {
      id: id,
      occupiedBy: []
    };
  }
  return tiles;

  // return Array(boardSize)
  //   .fill()
  //   .map((_, i) => {
  //     const x = getTileX(board, i);
  //     const y = getTileY(board, i);
  //     const id = getTileId(x, y);
  //     return {};
  //   });
};

let levelData = getLevelData(currentLevel);
console.log('levelData', levelData);

export default function App() {
  return (
    <Provider store={store}>
      <div className="App bp3-dark">
        <h1>SpaceDolls</h1>
        <CounterComponent />
        <hr />
        <h4>
          level id: {currentLevel} _ level name: {levels[currentLevel].name}
        </h4>
        <hr />
        <div style={{ position: 'relative', textAlign: 'left' }}>
          <Board level={currentLevel} />
          <TileInfo tile={selectedTile} levelData={levelData} />
        </div>
      </div>
    </Provider>
  );
}
