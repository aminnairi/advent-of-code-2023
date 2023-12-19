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
    throw new Error("A path must be provided\nexample: npm --workspace day1/part1 test input.txt");
  }

  const buffer = await FileSystem.readFile(path);

  const solution = buffer.toString().split("\n").filter(Boolean).map(line => {
    return line.split("").map(character => {
      return parseInt(character);
    }).filter((digitOrNotANumber) => {
      return !Number.isNaN(digitOrNotANumber);
    });
  }).map((digits) => {
    const firstDigit = digits.at(0);
    const lastDigit = digits.at(-1);

    if (firstDigit === undefined) {
      return 0;
    }

    if (lastDigit === undefined) {
      return parseInt(firstDigit.toString().repeat(2));
    }

    return parseInt(`${firstDigit}${lastDigit}`);
  }).reduce((sum, digit) => {
    return sum + digit;
  }, 0);

  console.log(solution);
};

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});
