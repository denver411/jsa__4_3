import setUpAttacks from '../src/js/app';

const charactersArray = [
  { name: 'маг', health: 100 },
  { name: 'лучник', health: 80 },
  { name: 'мечник', health: 10 },
];

describe('Без щита', () => {
  test('Урон распредеяется на одного персонажа', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithoutShield = setUpAttacks(characters, false);

    attackWithoutShield[1](10);
    expect(characters[0].health).toBe(100);
    expect(characters[1].health).toBe(70);
    expect(characters[2].health).toBe(10);
  });

  test('Урон не распределяется в минус', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithoutShield = setUpAttacks(characters, false);

    attackWithoutShield[1](100);
    expect(characters[0].health).toBe(100);
    expect(characters[1].health).toBe(0);
    expect(characters[2].health).toBe(10);
  });

  test('Урон не распредеяется на убитого персонажа', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithoutShield = setUpAttacks(characters, false);
    characters[1].health = 0;

    attackWithoutShield[1](10);
    expect(characters[0].health).toBe(100);
    expect(characters[1].health).toBe(0);
    expect(characters[2].health).toBe(10);
  });
});

describe('С щитом', () => {
  test('Урон распредеяется на всех', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithShield = setUpAttacks(characters);

    attackWithShield[1](9);
    expect(characters[0].health).toBe(97);
    expect(characters[1].health).toBe(77);
    expect(characters[2].health).toBe(7);
  });

  test('Нераспределенный урон снимается с атакованного персонажа', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithShield = setUpAttacks(characters);

    attackWithShield[2](20);
    expect(characters[0].health).toBe(94);
    expect(characters[1].health).toBe(74);
    expect(characters[2].health).toBe(2);
  });

  test('Урон распредеяется только на живых персонажей', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithShield = setUpAttacks(characters);
    characters[2].health = 2;

    attackWithShield[2](32);
    expect(characters[0].health).toBe(90);
    expect(characters[1].health).toBe(70);
    expect(characters[2].health).toBe(0);
  });

  test('Убитый персонаж не может быть атакован', () => {
    const characters = JSON.parse(JSON.stringify(charactersArray));
    const attackWithShield = setUpAttacks(characters);
    characters[2].health = 0;

    attackWithShield[2](10);
    expect(characters[0].health).toBe(100);
    expect(characters[1].health).toBe(80);
    expect(characters[2].health).toBe(0);
  });
});
