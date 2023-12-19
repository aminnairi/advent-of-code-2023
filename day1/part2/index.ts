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

  const digitsMap: Record<string, number> = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
  };
  
  const digitsKeys = Object.keys(digitsMap);

  const buffer = await FileSystem.readFile(path);

  const solution = buffer.toString().split("\n").filter(Boolean).map(line => {
    const initialDigits: Array<number> = [];
    const indices = Array.from(Array(line.length)).map((_, index) => index);

    return indices.reduce((digits, _, index) => {
      const foundDigitKey = digitsKeys.find((digitKey) => {
        return line.slice(index).startsWith(digitKey);
      }); 

      if (foundDigitKey) {
        const digit = digitsMap[foundDigitKey];

        return [
          ...digits,
          digit
        ];
      }

      return digits;
    }, initialDigits);
  }).map((digits) => {
    const firstDigit = digits.at(0);
    const lastDigit = digits.at(-1);

    if (!firstDigit) {
      return 0;
    }

    if (!lastDigit) {
      return firstDigit;
    }

    return parseInt(`${firstDigit}${lastDigit}`);
  }).reduce((sum, digit) => {
    return sum + digit
  }, 0);

  console.log(solution);
};

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});
