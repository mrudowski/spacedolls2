const dolls = {
  toi: {
    id: 'toi',
    race: 'human',
    codeName: 'Toi',
    stats: {
      hp: 2,
      move: 2,
      // light blaster
      attackStrength: 1,
      attackRange: 8,
      affectWalls: false,
      FOD: 1,
      aboveHeads: false,
      medic: 0,
      medicRange: 0,
    }
  },
  cleo: {
    id: 'cleo',
    race: 'human',
    codeName: 'Cleo',
    stats: {
      hp: 4,
      move: 1,
      // bazooka
      attackStrength: 2, // should be part of weapon stats
      attackRange: 10,
      affectWalls: true,
      FOD: 2,
      aboveHeads: true,
      // through dolls and wall
      // spread fire?
      medic: 0,
      medicRange: 0,
      defense: 2
    }
  },

  xantia: {
    id: 'xantia',
    race: 'alien',
    codeName: 'Xantia',
    stats: {
      hp: 3,
      move: 3,
      // swords
      attackStrength: 5, // should be stronger?
      attackRange: 1,
      affectWalls: false,
      FOD: 1,
      aboveHeads: false,
      medic: 0,
      medicRange: 0,
      defense: 0
    }
  },
  io: {
    id: 'io',
    race: 'alien',
    codeName: 'Io',
    stats: {
      hp: 2,
      move: 2,
      // nothing?
      attackStrength: 0,
      attackRange: 0,
      affectWalls: false,
      FOD: 0,
      aboveHeads: false,
      medic: 5,
      medicRange: 1,
      defense: 0
    }
  }
};

export default dolls;
