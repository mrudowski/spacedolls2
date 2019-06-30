import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import levels from '../data/levels';
import { changeLevel } from './brain/reducers/levelActions';

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
  // https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object

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
  console.log('tileMap get', tileMap.get('0,0'));
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

  return tileMap;

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

export default function Level() {
  const levelState = useSelector(state => state.level);
  const dispatch = useDispatch();

  // const start = () => dispatch(changeLevel('1'));

  useEffect(() => {
    console.log('useEffect');
    const start = () => dispatch(changeLevel('1'));
    start();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_THINGS' });
  // }, [dispatch]);

  return (
    <div>
      <h4>
        level id: {levelState.currentLevelId} _ level name:{' '}
        {levels[levelState.currentLevelId]
          ? levels[levelState.currentLevelId].name
          : ''}
      </h4>
      <hr />
      <div style={{ position: 'relative', textAlign: 'left' }}>
        <Board level={currentLevel} />
        <TileInfo tile={selectedTile} levelData={levelData} />
      </div>
    </div>
  );
}
