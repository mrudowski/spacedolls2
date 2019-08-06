import forEach from 'lodash/each';
import * as tileUtil from './tile';
import * as boardUtil from './board';
import * as dollUtil from './doll';
import * as pathFinderUtil from './pathFinder';
import jsgraphs from 'js-graph-algorithms';

console.log('moveAction module');
// change name
// change to const?
let validTilesTest = [];
let moveRange = 0;

// by easystar `enableSync` we change asynchronous function to synchronous
// but we still have to deal with callback in some way
const addTileToValidTiles = path => {
  // static 4 for now
  // we should get it from the selected doll stats/ap

  if (path && path.length > 0 && path.length <= moveRange) {
    // add all tiles from  path? and check if tile added
    const { x, y } = path[path.length - 1];
    const tileId = tileUtil.getIdFromXY(x, y);
    validTilesTest.push(tileId);
  }
};


// Future optimization:
// we could memorize graph if nothing change (when reselecting dolls)


export const getWalkableArea = (startTileId, tiles, dollId, boardSize) => {
	const g = new jsgraphs.WeightedDiGraph(boardSize.width * boardSize.height); // 6 is the number vertices in the graph
	const moveRange2 = dollUtil.getDollMove(dollId) + 1;
	const result = [];


	const passableAsWeight = (x, y) => {
		const id = tileUtil.getIdFromXY(x,y);
		// utils?
		const tile = tiles[id];
		if (!(tile.doll && id !== startTileId || tile.wall)) {
			return 1
		} else {
			return 99;
		}
	};

	const addEdge = (index, x, y) => {
		g.addEdge(new jsgraphs.Edge(index, tileUtil.getIndexFromXY(x, y, boardSize), passableAsWeight(x, y)));
	};

  //toArray
  //var index = 0;?

	// add only valid tiles to graph?

	forEach(tiles, (tile, tileId) => {
	  // TODO x and y as part of tile? tile.x ?
		const { x, y } = tileUtil.getXYFromId(tileId);
		const index = tileUtil.getIndexFromXY(x, y, boardSize);
		// if (tile.doll && tileId !== startTileId || tile.wall) {
		 //  //do nothing
    // } else {
			if (x > 0) {
				addEdge(index, x - 1, y);
			}
			if (y > 0) {
				addEdge(index, x, y - 1);
			}
			if (x < boardSize.width - 1) {
				addEdge(index, x + 1, y);
			}
			if (y < boardSize.height - 1) {
				addEdge(index, x, y + 1);
			}

    // }

		g.node(index).label = tileId;

	});

	const { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
	const dijkstra = new jsgraphs.Dijkstra(g, tileUtil.getIndexFromXY(startX, startY, boardSize));


	for(var v = 0; v < g.V; v++){
		if(dijkstra.hasPathTo(v)){
			//var path = dijkstra.pathTo(v);
      const distance = dijkstra.distanceTo(v);
			if (distance > 0 && distance < moveRange2) {
				result.push(tileUtil.getTileIdFromIndex(v, boardSize));
      }
			// console.log('=====path from 0 to ' + v + ' start==========');
			// for(var i = 0; i < path.length; ++i) {
			// 	var e = path[i];
			// 	console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
			// }
			// console.log('=====path from 0 to ' + v + ' end==========');
			// console.log('=====distance: '  + dijkstra.distanceTo(v) + '=========');
		}
	}
	return result;
};

//walkableArea /validTiles
export const getPossibleMoveTilesId = (startTileId, tiles, dollId, boardSize) => {
  validTilesTest = [];

  moveRange = dollUtil.getDollMove(dollId) + 1;

  pathFinderUtil.prepareGrid(tiles, boardSize);

  // we check all tiles on board - not best but easy
  // of course it would be better when counting from doll
  // Breadth First Search (flood fill)
	// or even better Dijkstra’s Algorithm (including nodes cost/weight)

	// if you need varying movement costs, Breadth First Search becomes Dijkstra’s Algorithm.
  // if you add a way to guide the search towards the goal, Breath First Search becomes Best First Search.
  // If you start with Breadth First Search and add early exit, weighted edges, and a heuristic, you get A*.

  // source: https://www.redblobgames.com/pathfinding/tower-defense/
	// https://www.redblobgames.com/pathfinding/a-star/introduction.html
  // and https://github.com/bah87/maze-runner

  forEach(tiles, (tile, tileId) => {
    //distance bigger or not
    // TODO isWalkable to the utils

    if (
      !tile.wall &&
      !tile.doll &&
      boardUtil.getDistance(startTileId, tileId) <= moveRange
    ) {
      const { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
      const { x: endX, y: endY } = tileUtil.getXYFromId(tileId);

      // TODO optimise!
      // and check if tile already added

			pathFinderUtil.calculatePath(
        startX,
        startY,
        endX,
        endY,
        addTileToValidTiles
      );
    }
  });
  return validTilesTest;
};
