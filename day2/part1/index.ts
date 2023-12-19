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
