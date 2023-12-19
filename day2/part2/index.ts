import * as FileSystem from "fs/promises";

interface CubeWithCountColor {
  red: number,
  green: number,
  blue: number
}

const main = async () => {
  const buffer = await FileSystem.readFile("./input.txt");
  const text = buffer.toString();

  const result = text.split("\n").filter(Boolean).map(line => {
    const [game, sets] = line.split(": ");

    const [, gameIdentifierAsString] = game.split(" ");
    const gameIdentifier = Number(gameIdentifierAsString);

    const initialCubeWithCountColor = {
      red: 0,
      green: 0,
      blue: 0
    };

    const cubes: CubeWithCountColor = sets.split("; ").flatMap(set => {
      return set.split(", ").map(cube => {
        const [count, color] = cube.split(" ");

        return [Number(count), color] as [number, string];
      })
    }).reduce((cubeWithCountColor, [count, color]) => {
      if (cubeWithCountColor[color] < count) {
        return {
          ...cubeWithCountColor,
          [color]: count
        };
      }

      return cubeWithCountColor;
    }, initialCubeWithCountColor)

    return [gameIdentifier, cubes] as [number, CubeWithCountColor];
  }).reduce((sum, [, cubeWithCountColor]) => {
    return sum + (cubeWithCountColor.red * cubeWithCountColor.green * cubeWithCountColor.blue);
  }, 0);

  console.log(result);
}

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});
