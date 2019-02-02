import setUpAttacks from '../src/js/app';

const characters = [
  { name: 'маг', health: 100 },
  { name: 'лучник', health: 80 },
  { name: 'мечник', health: 10 },
];

const attackWithShield = setUpAttacks(characters);
const attackWithoutShield = setUpAttacks(characters, false);

// attacks[1](9); // атакуем лучника 9 баллами урона
// [
//   {name: 'маг', health: 97},
//   {name: 'лучник', health: 77},
//   {name: 'мечник', health: 7},
// ]

console.log(characters);

test('Урон распредеяется на всех', () => {
  attackWithShield[1](9);
  expect(characters[0].health).toBe(97);
  expect(characters[1].health).toBe(77);
  expect(characters[2].health).toBe(7);
});

test('Урон распредеяется на одного персонажа', () => {
  attackWithoutShield[1](10);
  expect(characters[0].health).toBe(97);
  expect(characters[1].health).toBe(67);
  expect(characters[2].health).toBe(7);
});

test('Нераспределенный урон снимается с атакованного персонажа', () => {
  attackWithShield[2](20);
  expect(characters[0].health).toBe(91);
  expect(characters[1].health).toBe(61);
  expect(characters[2].health).toBe(0);
});

test('Урон распредеяется только на живых персонажей', () => {
  attackWithShield[0](10);
  expect(characters[0].health).toBe(86);
  expect(characters[1].health).toBe(56);
  expect(characters[2].health).toBe(0);
});

test('Убитый персонаж не может быть атакован', () => {
  attackWithShield[2](10);
  expect(characters[0].health).toBe(86);
  expect(characters[1].health).toBe(56);
  expect(characters[2].health).toBe(0);
});
