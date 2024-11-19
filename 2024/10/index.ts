const part1 = async () => {
  const input = await Bun.file("input1.txt").text();

  const grid = input.split("\n").map((line) => line.split(""));
  const columns = Object.keys(grid[0])
    .map(Number)
    .map((index) => grid.map((row) => row[index]));
  const runicWord = [];

  for (let y = 2; y < 6; y++) {
    for (let x = 2; x < 6; x++) {
      const row = grid[y].filter((c) => c !== ".");
      const column = columns[x].filter((c) => c !== ".");
      const letter = row.filter((item) => column.includes(item));
      runicWord.push(letter);
    }
  }

  console.log({ part1: runicWord.join("") });
};

const part2 = async () => {
  const input = await Bun.file("input2.txt").text();
  const supergrid = input.split("\n").map((line) => line.split(""));
  const gridSize = 8;
  const horizontalGrids = (supergrid[0].length + 1) / (gridSize + 1);
  const verticalGrids = (supergrid.length + 1) / (gridSize + 1);

  const calculatePower = (letters: string[]) =>
    letters.reduce((acc, letter, i) => {
      acc += (i + 1) * (parseInt(letter, 36) - 9);
      return acc;
    }, 0);

  const words: string[][] = [];
  let grid: string[][] = [];
  for (let i = 0; i < verticalGrids; i++) {
    for (let j = 0; j < horizontalGrids; j++) {
      for (let y = 0; y < gridSize; y++) {
        grid[y] = [];
        for (let x = 0; x < gridSize; x++) {
          grid[y][x] =
            supergrid[y + i * (gridSize + 1)][x + j * (gridSize + 1)];
        }
      }
      const columns = Object.keys(grid[0])
        .map(Number)
        .map((index) => grid.map((row) => row[index]));
      const runicWord: string[] = [];

      for (let y = 2; y < 6; y++) {
        for (let x = 2; x < 6; x++) {
          const row = grid[y].filter((c) => c !== ".");
          const column = columns[x].filter((c) => c !== ".");
          const letter = row.filter((item) => column.includes(item))[0];
          runicWord.push(letter);
        }
      }
      words.push(runicWord);
    }
  }

  const result = words.reduce((acc, word) => {
    acc += calculatePower(word);
    return acc;
  }, 0);

  console.log({ part2: result });
};

part1();
part2();
