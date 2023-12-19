/**
 * advent-of-code-2023
 * Copyright (C) 2023 Amin NAIRI
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import * as Process from "process";
import * as FileSystem from "fs/promises";

interface CubeWithCountColor {
  red: number,
  green: number,
  blue: number
}

const main = async () => {
  const path = Process.argv[2];

  if (!path) {
    throw new Error("A path must be provided\nexample: npm --workspace day2/part2 test input.txt");
  }

  const buffer = await FileSystem.readFile(path);
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
