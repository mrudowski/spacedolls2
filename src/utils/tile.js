// remove tile form names?

export const getTileXFromId = id => parseInt(id.split(',')[0], 10);
export const getTileYFromId = id => parseInt(id.split(',')[1], 10);
export const getXYFromId = id => {
  const idArray = id.split(',');
  return { x: parseInt(idArray[0], 10), y: parseInt(idArray[1], 10) };
};

export const getTileXFromIndex = (index, width) => index % width;
export const getTileYFromIndex = (index, height) => Math.floor(index / height);

export const getIdFromXY = (x, y) => `${x},${y}`;

export const getTileIdFromIndex = (index, size) =>
  `${getTileXFromIndex(index, size.width)},${getTileYFromIndex(
    index,
    size.height
  )}`;

