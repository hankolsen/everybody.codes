const getGrid = (input: string) =>
  input.split("\n").map((line) => line.split(" ").map(Number));

const getColumns = (grid: number[][]) =>
  Object.keys(grid[0])
    .map(Number)
    .map((index) => grid.map((row) => row[index]));

const shout = (columns: number[][]) => {
  return columns.map((row) => row[0]).join("");
};

const walk = (clapper: number, column: number, columns: number[][]) => {
  const clapperPosition = Math.abs(
    (clapper % (columns[column].length * 2)) - 1,
  );
  columns[column].splice(clapperPosition, 0, clapper);
};

const part1 = async () => {
  const input = await Bun.file("input1.txt").text();
  const grid = getGrid(input);
  const columns = getColumns(grid);

  for (let i = 0; i < 10; i++) {
    const startColumn = i % grid[0].length;
    const clapper = columns[startColumn].shift()!;
    const targetColumn = (startColumn + 1) % grid[0].length;
    walk(clapper, targetColumn, columns);
  }
  console.log({ part1: shout(columns) });
};

const part2 = async () => {
  const input = await Bun.file("input2.txt").text();

  const grid = getGrid(input);
  const columns = getColumns(grid);
  const shouts: Record<string, number> = {};

  for (let i = 0; i < Infinity; i++) {
    const startColumn = i % grid[0].length;
    const clapper = columns[startColumn].shift()!;
    const targetColumn = (startColumn + 1) % grid[0].length;
    walk(clapper, targetColumn, columns);
    const result = shout(columns);
    shouts[result] = shouts[result] ? shouts[result] + 1 : 1;
    if (shouts[result] === 2024) {
      console.log(`${i + 1}: ${result} ${shouts[result]}`);
      console.log({ part2: (i + 1) * Number(result) });
      break;
    }
  }
};

part1();
part2();
