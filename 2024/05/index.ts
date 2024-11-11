const part1 = async () => {
  const input = await Bun.file("input1.txt").text();

  const grid = input.split("\n").map((line) => line.split(" ").map(Number));

  const columns = Object.keys(grid[0])
    .map(Number)
    .map((index) => grid.map((row) => row[index]));

  const shout = (columns: number[][]) => {
    console.log(columns.map((row) => row[0]).join(""));
  };

  const insertAfter = (
    clapper: number,
    position: number,
    column: number,
    columns: number[][],
  ) => {
    columns[column] = [
      ...columns[column].slice(0, position + 1),
      clapper,
      ...columns[column].slice(position + 1),
    ];
  };

  const insertBefore = (
    clapper: number,
    position: number,
    column: number,
    columns: number[][],
  ) => {
    columns[column] = [
      ...columns[column].slice(0, position),
      clapper,
      ...columns[column].slice(position),
    ];
  };

  const walk = (clapper: number, column: number, columns: number[][]) => {
    if (clapper <= columns[column].length) {
      const clapperPosition = clapper - 1;
      insertBefore(clapper, clapperPosition, column, columns);
    } else {
      const clapperPosition =
        columns[column].length - (columns[column].length - clapper + 1);
      insertAfter(clapper, clapperPosition, column, columns);
    }
  };

  for (let i = 0; i < 10; i++) {
    const startColumn = i % grid[0].length;
    const clapper = columns[startColumn].shift()!;
    const targetColumn = (startColumn + 1) % grid[0].length;
    walk(clapper, targetColumn, columns);
    shout(columns);
  }
};

part1();
