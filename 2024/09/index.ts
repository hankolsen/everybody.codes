const part1 = async () => {
  const input = await Bun.file("input1.txt").text();

  const numbers = input.split("\n").map(Number);

  const stamps = `1, 3, 5, 10`
    .split(", ")
    .map(Number)
    .sort((a, b) => b - a);

  const result = numbers.reduce((acc, number) => {
    let remaining = number;
    let divisor = 0;

    stamps.some((stamp) => {
      if ((divisor = Math.floor(remaining / stamp)) > 0) {
        remaining -= divisor * stamp;
        acc += divisor;
      }

      return remaining === 0;
    });
    return acc;
  }, 0);

  console.log({ part1: result });
};

part1();
