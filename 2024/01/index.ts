const potions: Record<string, number> = {
  A: 0,
  B: 1,
  C: 3,
  D: 5,
};

const getPotions = (creature: string) => {
  return potions[creature];
};

const getPairPotions = (pair: string[]) => {
  return pair.reduce((acc, creature) => {
    acc += getPotions(creature) + 1;
    return acc;
  }, 0);
};

/**
 * Part 1
 */
const input1 = (await Bun.file("input1.txt").text()).split("\n")[0];

const part1 = input1.split("").reduce((acc, letter) => {
  acc += getPotions(letter);
  return acc;
}, 0);
console.log({ part1 });

/**
 * Part 2
 */
const input2 = await Bun.file("input2.txt").text();
const pairs = input2.match(/[A-Dx]{2}/g) ?? [];

const part2 = pairs.reduce((acc, pair) => {
  if (/[A-D]{2}/.test(pair)) {
    acc += getPairPotions(pair.split(""));
    return acc;
  }

  const [letter] = pair.match(/[A-D]/g) ?? [];
  if (letter) {
    acc += getPotions(letter);
  }
  return acc;
}, 0);

console.log({ part2 });

const input3 = await Bun.file("input3.txt").text();

const groups = input3.match(/[A-Dx]{3}/g) ?? [];
const part3 = groups.reduce((acc, group) => {
  if (group === "xxx") {
    return acc;
  }

  if (/[A-D]{3}/.test(group)) {
    acc += group.split("").reduce((sum, creature) => {
      sum += getPotions(creature) + 2;
      return sum;
    }, 0);
    return acc;
  }

  if (/[A-D]x?[A-D]/.test(group)) {
    acc += getPairPotions(group.split("").filter((l) => l !== "x"));
    return acc;
  }

  const [letter] = group.match(/[A-D]/) ?? [];
  if (letter) {
    acc += getPotions(letter);
    return acc;
  }

  return acc;
}, 0);

console.log({ part3 });
