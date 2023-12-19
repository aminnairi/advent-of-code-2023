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

  const buffer: Buffer = await FileSystem.readFile(path);

  const initialCardsWinningCount: Record<number, number> = {};

  const solution = buffer.toString().split("\n").filter(Boolean).reduce((previousCardsWinningCount, line, lineIndex) => {
    const cardIdentifier = lineIndex + 1;
    const [, winningPlayedCharacters] = line.split(": ").filter(Boolean);
    const [winningLine, playedLine] = winningPlayedCharacters.split(" | ").filter(Boolean);

    const allWinningCharacters = winningLine.split(/\s+/).filter(Boolean);
    const allPlayedCharacters = playedLine.split(/\s+/).filter(Boolean);

    const winningNumbers = allWinningCharacters.map(winningCharacters => {
      return parseInt(winningCharacters);
    });

    const playedNumbers = allPlayedCharacters.map(playedCharacters => {
      return parseInt(playedCharacters);
    });

    const playedWinningNumbers = playedNumbers.filter(playedNumber => {
      return winningNumbers.includes(playedNumber);
    });

    if (playedWinningNumbers.length === 0) {
      return previousCardsWinningCount;
    }

    const cardWinningCount = (previousCardsWinningCount[cardIdentifier] ?? 0) + 1;

    const initialNextCardsWinningCount = {
      ...previousCardsWinningCount,
      [cardIdentifier]: cardWinningCount
    };

    return Array.from(Array(playedWinningNumbers.length)).map((_, index) => {
      return cardIdentifier + index + 1;
    }).reduce((nextCardsWinningCount, nextCardIdentifier) => {
      return {
        ...nextCardsWinningCount,
        [nextCardIdentifier]: (nextCardsWinningCount[nextCardIdentifier] ?? 0) + 1 * cardWinningCount
      };
    }, initialNextCardsWinningCount);
  }, initialCardsWinningCount);

  console.log(solution);
}

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});
