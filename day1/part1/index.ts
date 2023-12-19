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

const parseIntOr = (fallback: number, input: unknown): number => {
  const parsedInt: number = (() => {
    if (typeof input === "string") {
      return parseInt(input, 10);
    }

    return parseInt(String(input), 10);
  })();

  if (Number.isNaN(parsedInt)) {
    return fallback;
  }

  return parsedInt;
};

const main = async () => {
  const path = Process.argv[2];

  if (!path) {
    throw new Error("A path must be provided\nexample: npm --workspace day1/part1 test input.txt");
  }

  const buffer: Buffer = await FileSystem.readFile(path);

  const text: string = buffer.toString();

  const lines: Array<string> = text.split("\n");

  const linesWithoutEmptyLines = lines.filter(line => {
    return line.trim().length !== 0;
  });

  const linesWithCharacters: Array<Array<string>> = linesWithoutEmptyLines.map(line => {
    return line.split("");
  });

  const linesWithNumbers: Array<Array<number>> = linesWithCharacters.map(lineWithCharacters => {
    return lineWithCharacters.map(character => {
      return parseInt(character, 10);
    }).filter(number => {
      return !Number.isNaN(number);
    });
  });

  const linesWithCalibration: Array<number> = linesWithNumbers.map(lineWithNumbers => {
    const firstNumber: number | undefined = lineWithNumbers.at(0);
    const lastNumber: number | undefined = lineWithNumbers.at(-1);

    if (typeof firstNumber === "undefined") {
      return 0;
    }

    if (typeof lastNumber === "undefined") {
      return parseIntOr(0, `${firstNumber}`.repeat(2));
    }

    return parseIntOr(0, `${firstNumber}${lastNumber}`);
  });

  const solution: number = linesWithCalibration.reduce((sum, calibration) => {
    return sum + calibration;
  }, 0);

  console.log(solution);
};

main().catch(error => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
});
