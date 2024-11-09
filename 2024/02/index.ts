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

part1();
part2();
