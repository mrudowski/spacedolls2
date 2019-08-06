// remove tile form names?

export const getTileXFromId = id => parseInt(id.split(',')[0], 10);
export const getTileYFromId = id => parseInt(id.split(',')[1], 10);
export const getXYFromId = id => {
  const idArray = id.split(',');
  return { x: parseInt(idArray[0], 10), y: parseInt(idArray[1], 10) };
};

export const getIdFromXY = (x, y) => `${x},${y}`;

export const getTileXFromIndex = (index, size) => index % size.width;
export const getTileYFromIndex = (index, size) => Math.floor(index / size.width);

export const getTileIdFromIndex = (index, size) =>
	`${getTileXFromIndex(index, size)},${getTileYFromIndex(index, size)}`;

export const getIndexFromXY = (x, y, size) => {
  return x + (y * size.width);
};


