const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const getCellValue = (x: number, y: number) => {
    if (
      y < 0 ||
      y === grid.length ||
      x < 0 ||
      x === grid[0].length ||
      grid[y][x] === "."
    ) {
      return 0;
    }

    return Number(grid[y][x]);
  };

  const positions: { dy: number; dx: number }[] = [
    { dy: -1, dx: 0 },
    { dy: 0, dx: -1 },
    { dy: 0, dx: 1 },
    { dy: 1, dx: 0 },
  ];

  const diggingIsAllowed = (x: number, y: number) => {
    const cellValue = getCellValue(x, y);
    return positions.every(({ dx, dy }) => {
      return cellValue - getCellValue(x + dx, y + dy) <= 0;
    });
  };

  for (let i = 0; i < 20; i++) {
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === ".") {
          return;
        }

        if (cell === "#") {
          grid[y][x] = "1";
          return;
        }

        if (diggingIsAllowed(x, y)) {
          grid[y][x] = String(Number(grid[y][x]) + 1);
          return;
        }
      });
    });
  }

  const result = grid.reduce((gridSum, row) => {
    gridSum += row.reduce((rowSum, cell) => {
      rowSum += Number(cell) ? Number(cell) : 0;
      return rowSum;
    }, 0);

    return gridSum;
  }, 0);

  return result;
};

const part1 = async () => {
  const input = await Bun.file("input1.txt").text();
  console.log({ part1: solve(input) });
};

const part2 = async () => {
  const input = await Bun.file("input2.txt").text();
  console.log({ part2: solve(input) });
};

const part3 = async () => {
  const input = await Bun.file("input3.txt").text();
  const grid = input.split("\n").map((line) => line.split(""));

  const getCellValue = (x: number, y: number) => {
    if (
      y < 0 ||
      y === grid.length ||
      x < 0 ||
      x === grid[0].length ||
      grid[y][x] === "."
    ) {
      return 0;
    }

    return Number(grid[y][x]);
  };

  const positions: { dy: number; dx: number }[] = [
    { dy: -1, dx: -1 },
    { dy: -1, dx: 0 },
    { dy: -1, dx: 1 },
    { dy: 0, dx: -1 },
    { dy: 0, dx: 1 },
    { dy: 1, dx: -1 },
    { dy: 1, dx: 0 },
    { dy: 1, dx: 1 },
  ];

  const diggingIsAllowed = (x: number, y: number) => {
    const cellValue = getCellValue(x, y);
    return positions.every(({ dx, dy }) => {
      return cellValue - getCellValue(x + dx, y + dy) <= 0;
    });
  };

  for (let i = 0; i < 20; i++) {
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === ".") {
          return;
        }

        if (cell === "#") {
          grid[y][x] = "1";
          return;
        }

        if (diggingIsAllowed(x, y)) {
          grid[y][x] = String(Number(grid[y][x]) + 1);
          return;
        }
      });
    });
  }

  const result = grid.reduce((gridSum, row) => {
    gridSum += row.reduce((rowSum, cell) => {
      rowSum += Number(cell) ? Number(cell) : 0;
      return rowSum;
    }, 0);

    return gridSum;
  }, 0);
  console.log({ part3: result });
};

part1();
part2();
part3();
