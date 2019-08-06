const dolls = {
  toi: {
    id: 'toi',
    race: 'human',
    codeName: 'Toi',
    stats: {
      hp: 10,
      move: 12,
      // light blaster
      attack: 5,
			attackRange: 10,
			affectWalls: false,
			fieldOfDestruction: 1,
			aboveHeads: false,
      medic: 0,
      medicRange: 0,
      defense: 1
    }
  },
  cleo: {
    id: 'cleo',
    race: 'human',
    codeName: 'Cleo',
    stats: {
      hp: 12,
      move: 1,
      // bazooka
      attack: 10, // should be part of weapon stats
      attackRange: 10,
      affectWalls: true,
			fieldOfDestruction: 2,
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
      hp: 8,
      move: 3,
      // swords
      attack: 5, // should be stronger?
			attackRange: 1,
			affectWalls: false,
			fieldOfDestruction: 1,
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
      hp: 7,
      move: 2,
      // nothing?
      attack: 0,
			attackRange: 0,
			affectWalls: false,
			fieldOfDestruction: 0,
			aboveHeads: false,
      medic: 5,
      medicRange: 1,
      defense: 0
    }
  }
};

export default dolls;
