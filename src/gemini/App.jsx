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

  // Map vs Object, mutation, spread, assign... with in depth discussion in comments section
  // https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7

  // [[ 1, 'one' ],[ 2, 'two' ]])

  var tileMap = new Map(
    Array(boardSize)
      .fill()
      .map((val, i) => {
        const x = getTileX(board, i);
        const y = getTileY(board, i);
        const id = getTileId(x, y);
        return [
          id,
          {
            id: id,
            occupiedBy: []
          }
        ];
      })
  );
  console.log('tileMap', tileMap);
  //  var result = new Map(arr.map(i => [i.key, i.val]));

  const tiles = Array(boardSize)
    .fill()
    .reduce(function(map, obj, i) {
      const x = getTileX(board, i);
      const y = getTileY(board, i);
      const id = getTileId(x, y);
      map[id] = {
        id: id,
        occupiedBy: []
      };
      return map;
    }, {});

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
console.log('levelData1', levelData);

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
