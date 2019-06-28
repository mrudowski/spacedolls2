const levels = {
  '1': {
    id: '1',
    name: 'The Lab',
    size: {
      width: 5,
      height: 5
    },
    tiles: {},
    walls: [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
    dolls: [
      { id: 'toi', team: 'dolls', x: 1, y: 1 },
      { id: 'cleo', team: 'dolls', x: 0, y: 3 },
      { id: 'xantia', team: 'aliens', x: 4, y: 1 },
      { id: 'io', team: 'aliens', x: 4, y: 2 }
    ]
  }
};

export default levels;