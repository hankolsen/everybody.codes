const solve = (input: string) => {
  const heights = input.split("\n").map(Number);

  const minHeight = Math.min(...heights);
  return heights.reduce((sum, nail) => sum + nail - minHeight, 0);
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

  const nails = input
    .split("\n")
    .map(Number)
    .filter((x) => x)
    .sort();

  const middle = nails[nails.length / 2];
  const result = nails.reduce((sum, nail) => sum + Math.abs(nail - middle), 0);

  console.log({ part3: result });
};

part1();
part2();
part3();
