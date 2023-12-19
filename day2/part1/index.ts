import * as FileSystem from "fs/promises";
import * as Process from "process";

const main = async () => {
  const path = Process.argv[2];

  if (!path) {
    throw new Error("A path must be provided\nexample: npm --workspace day2/part1 test input.txt");
  }

  const buffer = await FileSystem.readFile(path);
  const text = buffer.toString();

  const expectations = {
    red: 12,
    green: 13,
    blue: 14
  };

  const solution = text.split("\n").filter(Boolean).map(line => {
    const [game, sets] = line.split(": ");

    const [, gameIdentifierAsString] = game.split(" ");
    const gameIdentifier = Number(gameIdentifierAsString);

    const expectationsMatches: Array<Array<boolean>> = sets.split("; ").map(set => {
      return set.split(", ").map(cube => {
        const [count, color] = cube.split(" ");

        return count <= expectations[color];
      })
    });

    const gameWithExpectationsMatches: [number, Array<Array<boolean>>] = [gameIdentifier, expectationsMatches];

    return gameWithExpectationsMatches;
  }).filter(([, expectationsMatches]) => {
    return expectationsMatches.every((expectationMatches) => {
      return expectationMatches.every(Boolean);
    });
  }).reduce((solution, [gameIdentifier]) => {
    return solution + gameIdentifier;
  }, 0);

  console.log(solution);
}

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});
