const part1 = () => {
  const input = "4098336";
  const blocks = Number(input);
  const layers = Math.floor(Math.sqrt(blocks));
  const neededBlocks = Math.pow(layers + 1, 2);
  const diff = neededBlocks - blocks;
  const width = neededBlocks - Math.pow(layers, 2);
  console.log({ part1: diff * width });
};

const part2 = () => {
  const input = "998";
  const priestsOfNull = Number(input);
  const priestsAcolytes = 1111;
  const maxBlocks = 20240000;

  let thickness = 1;
  let width = 1;
  let usedBlocks = 1;
  while (usedBlocks < maxBlocks) {
    thickness = (thickness * priestsOfNull) % priestsAcolytes;
    usedBlocks += (width + 2) * thickness;
    width += 2;
  }
  console.log({ part2: (usedBlocks - maxBlocks) * width });
};

part1();
part2();
