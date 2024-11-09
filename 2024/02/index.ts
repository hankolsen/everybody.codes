const part1 = async () => {
  const input = await Bun.file("input1.txt").text();

  const words = input.split("\n")[0].split("WORDS:")[1].split(",");
  const text = input.split("\n")[2];

  const result = text.split(" ").reduce((sum, part) => {
    words.forEach((word) => {
      if (part.match(new RegExp(word))) {
        sum += 1;
      }
    });
    return sum;
  }, 0);

  console.log({ part1: result });
};

const part2 = async () => {
  const input = await Bun.file("input2.txt").text();

  const words = input.split("\n")[0].split("WORDS:")[1].split(",");
  const [, , ...lines] = input.split("\n");

  const result = lines.reduce((sum, text) => {
    sum += text.split(" ").reduce((sum, part) => {
      if (!part) {
        return sum;
      }

      const matches = new Array(part.length).fill(0);
      words.forEach((word) => {
        let indexes = [
          ...part.matchAll(new RegExp(`(?=${word})`, "g")),
          ...part.matchAll(
            new RegExp(`(?=${word.split("").reverse().join("")})`, "g"),
          ),
        ].map((i) => i.index);

        indexes.forEach((index) => {
          for (let i = 0; i < word.length; i++) {
            matches[i + index] = 1;
          }
        });
      });
      sum += matches.filter((m) => m).length;
      return sum;
    }, 0);
    return sum;
  }, 0);

  console.log({ part2: result });
};

const part3 = async () => {
  const input = await Bun.file("input3.txt").text();
  const words = input.split("\n")[0].split("WORDS:")[1].split(",");
  const [, , ...lines] = input.split("\n");

  words.forEach((word) => {
    const backwardsWord = word.split("").reverse().join("");
    if (!words.includes(backwardsWord)) {
      words.push(backwardsWord);
    }
  });

  const grid = lines.map((line) => line.split(""));

  let matches: Record<string, number> = {};
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      words.forEach((word) => {
        // Horizontally
        let found = word.split("").every((letter, i) => {
          return letter === grid[y][(x + i) % grid[0].length];
        });
        if (found) {
          word.split("").forEach((_, i) => {
            matches[`${(x + i) % grid[0].length},${y}`] = 1;
          });
        }

        // Vertically
        found = word.split("").every((letter, i) => {
          return y + i < grid.length && letter === grid[y + i][x];
        });
        if (found) {
          word.split("").forEach((_, i) => {
            matches[`${x},${y + i}`] = 1;
          });
        }
      });
    }
  }
  console.log({ part3: Object.keys(matches).length });
};

part1();
part2();
part3();
