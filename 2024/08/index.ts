const part1 = () => {
  const input = "4098336";
  const blocks = Number(input);
  const layers = Math.floor(Math.sqrt(blocks));
  const neededBlocks = Math.pow(layers + 1, 2);
  const diff = neededBlocks - blocks;
  const width = neededBlocks - Math.pow(layers, 2);
  console.log({ part1: diff * width });
};

part1();
