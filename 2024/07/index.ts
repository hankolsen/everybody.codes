const part1 = async () => {
  const input = await Bun.file("input1.txt").text();

  const grid = input
    .split("\n")
    .reduce((acc: Record<string, string[]>, line) => {
      const [racer, trackString] = line.split(":");
      const track = trackString.split(",");
      acc[racer] = track;
      return acc;
    }, {});

  const racers = Object.keys(grid).reduce(
    (acc: Record<string, number[]>, racer) => {
      acc[racer] = [];
      return acc;
    },
    {},
  );

  for (let i = 1; i <= 10; i++) {
    Object.keys(racers).forEach((racer) => {
      const current = racers[racer][i - 1] ?? 10;
      const action = grid[racer][(i - 1) % grid[racer].length];
      racers[racer][i] =
        action === "=" ? current : action === "+" ? current + 1 : current - 1;
    });
  }
  console.log({ grid, racers });
  const totals = Object.entries(racers).reduce(
    (acc: Record<string, number>, [racer, results]) => {
      acc[racer] = results.reduce((sum, r) => sum + r, 0);
      return acc;
    },
    {},
  );
  const sorted = Object.entries(totals)
    .sort(([k1, v1], [k2, v2]) => v2 - v1)
    .map(([k, v]) => k)
    .join("");
  console.log({ part1: sorted });
};

part1();
