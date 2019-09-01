import jsgraphs from 'js-graph-algorithms';
import * as tileUtil from './tile';
import * as boardUtil from './board';
import * as dollUtil from './doll';
// import * as pathFinderUtil from './pathFinder';

console.log('moveAction module');

// Breadth First Search (flood fill)
// or even better Dijkstra’s Algorithm (including nodes cost/weight)

// if you need varying movement costs, Breadth First Search becomes Dijkstra’s Algorithm.
// if you add a way to guide the search towards the goal, Breath First Search becomes Best First Search.
// If you start with Breadth First Search and add early exit, weighted edges, and a heuristic, you get A*.

// sources:
// https://www.redblobgames.com/pathfinding/tower-defense/
// https://www.redblobgames.com/pathfinding/a-star/introduction.html
// https://github.com/bah87/maze-runner


// ------------------------------


// using Dijkstra
// https://github.com/chen0040/js-graph-algorithms

// Future optimization:
// we could memorize graph if nothing change (when reselecting dolls)
// and much more...


export const getRangeTilesIds = (tiles, startTile, boardSize) => {
	const tilesAsGraph = new jsgraphs.WeightedDiGraph(boardSize.width * boardSize.height);
	const dollId = dollUtil.getDollFromTile(startTile);
	const range = dollUtil.getDollMove(dollId) + 1;

	const isWalkable = tileDM =>
		!((tileDM.hasDoll() && tileDM.getId() !== startTile.id) || tileDM.hasWall());

	const walkableAsWeight = (x, y) => {
		const tileId = tileUtil.getIdFromXY(x,y);
		const tileDM = tileUtil.getDataModel(tiles[tileId]);
		if (isWalkable(tileDM)) {
			return 1;
		}
		return 99;
	};

	const addEdge = (index, x, y) => {
		tilesAsGraph.addEdge(new jsgraphs.Edge(
			index,
			tileUtil.getIndexFromXY(x, y, boardSize),
			walkableAsWeight(x, y)
		));
	};

	const tilesIdsToCheck = [];
	boardUtil.forEachTile(tiles, (tile, tileId) => {
		const tileDM = tileUtil.getDataModel(tile);
		if (isWalkable(tileDM)) {
			const distance = boardUtil.getDistance(startTile.id, tileId);
			if (distance < range) {
				// distanceSortedArray[distance].push(tileId);
				tilesIdsToCheck.push(tileId);
			}
		}
	});

	tilesIdsToCheck.forEach(tileId => {
		const { x, y } = tileUtil.getXYFromId(tileId);
		const index = tileUtil.getIndexFromXY(x, y, boardSize);

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

		// tilesAsGraph.node(index).label = tileId;

	});

	const { x: startX, y: startY } = tileUtil.getXYFromId(startTile.id);
	const dijkstra = new jsgraphs.Dijkstra(
		tilesAsGraph,
		tileUtil.getIndexFromXY(startX, startY, boardSize)
	);

	const rangeTilesIds = [],
				paths = {};
	for (let v = 0; v < tilesAsGraph.V; v++) {
		if (dijkstra.hasPathTo(v)) {
			const distance = dijkstra.distanceTo(v);
			if (distance > 0 && distance < range) {
				rangeTilesIds.push(tileUtil.getIdFromIndex(v, boardSize));
				const path = dijkstra.pathTo(v).map(edge =>
					tileUtil.getIdFromIndex(edge.to(), boardSize)
				);
				const endTileId = path[path.length - 1];
				paths[endTileId] = path;
			}
		}
	}
	return [rangeTilesIds, paths];
};


// ---------- getRangeTilesIds 2

// here we calculate path to every valid tile...
// not so clever but for our little needs it works pretty well
//
// but for fun (and some optimization) we should try calculate paths to most distance tiles
// and - when valid - we should merge all path as result tiles
// (like in attackAction)

/*
export const getRangeTilesIds2 = (tiles, startTile, boardSize) => {
	const dollId = dollUtil.getDollFromTile(startTile);
	const range = dollUtil.getDollMove(dollId) + 1;
	const rangeTilesIds = [];

	// by easystar `enableSync` we change asynchronous function to synchronous
	// but we still have to deal with callback
	const addTileToValidTiles = path => {
		// <= ?
		if (path && path.length > 0 && path.length <= range) {
`			// optimize add all tiles from path? and check if tile added
			const { x, y } = path[path.length - 1];
			const tileId = tileUtil.getIdFromXY(x, y);
			rangeTilesIds.push(tileId);
		}
	};

	pathFinderUtil.prepareGrid(tiles, boardSize); // whole board?

	boardUtil.forEachTile(tiles, (tile, tileId) => {
    if (
			// isWalkable to the utils?
      !tile.wall &&
      !tile.dollId &&
      boardUtil.getDistance(startTile.id, tileId) <= range // ? <=
    ) {
      const { x: startX, y: startY } = tileUtil.getXYFromId(startTile.id);
      const { x: endX, y: endY } = tileUtil.getXYFromId(tileId);

      // optimise!
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
  return rangeTilesIds;
};
*/
