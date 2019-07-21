// remove tile form names?

export const getTileXFromId = id => id.split(',')[0];
export const getTileYFromId = id => id.split(',')[1];
export const getXYFromId = id => {
  const idArray = id.split(',');
  return { x: idArray[0], y: idArray[1] };
};

export const getTileXFromIndex = (index, width) => index % width;
export const getTileYFromIndex = (index, height) => Math.floor(index / height);

export const getIdFromXY = (x, y) => `${x},${y}`;

export const getTileIdFromIndex = (index, size) =>
  `${getTileXFromIndex(index, size.width)},${getTileYFromIndex(
    index,
    size.height
  )}`;

