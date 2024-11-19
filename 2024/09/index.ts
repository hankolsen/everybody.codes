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

part1();
