const levels = {
  '1': {
    id: '1',
    name: 'The Lab',
    size: {
      width: 10,
      height: 10
    },
    tiles: {},
    walls: [{ tile: '2,1' }, { tile: '2,2' }, { tile: '2,3' }],
    dolls: [
      { id: 'toi', team: 'dolls', tile: '1,1' },
      { id: 'cleo', team: 'dolls', tile: '0,3' },
      { id: 'xantia', team: 'aliens', tile: '4,1' },
      { id: 'io', team: 'aliens', tile: '4,2' }
    ]
  }
};

export default levels;
