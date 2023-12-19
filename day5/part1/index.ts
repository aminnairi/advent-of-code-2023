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

class Pipe<Value> {
  private constructor(private readonly value: Value) { }

  public static fromValue<Value>(value: Value): Pipe<Value> {
    return new Pipe(value);
  }

  public next<NewValue>(callback: (value: Value) => NewValue): Pipe<NewValue> {
    return new Pipe(callback(this.value));
  }

  public toValue(): Value {
    return this.value;
  }
}

const dropWhile = <Item>(predicate: (item: Item) => boolean, items: Array<Item>): Array<Item> => {
  if (items.length === 0) {
    return items;
  }

  const [item, ...remainingItems] = items;

  if (predicate(item)) {
    return dropWhile(predicate, remainingItems);
  }

  return [item, ...remainingItems];
}

const drop = <Item>(count: number, items: Array<Item>): Array<Item> => {
  if (items.length === 0) {
    return items;
  }

  if (count === 0) {
    return items;
  }

  const [, ...remainingItems] = items;

  return drop(count - 1, remainingItems);
}

const takeWhile = <Item>(predicate: (item: Item) => boolean, items: Array<Item>): Array<Item> => {
  if (items.length === 0) {
    return items;
  }

  const [item, ...remainingItems] = items;

  if (predicate(item)) {
    return [item, ...takeWhile(predicate, remainingItems)];
  }

  return [];
};

const main = async () => {
  const path = Process.argv[2];

  if (!path) {
    throw new Error("A path must be provided\nexample: npm --workspace day2/part1 test input.txt");
  }

  const buffer: Buffer = await FileSystem.readFile(path);

  const lines = buffer.toString().split("\n").filter(Boolean);

  const seedsLine = lines.find(line => {
    return line.startsWith("seeds: ");
  });

  if (seedsLine === undefined) {
    throw new Error("Bad input file");
  }

  const [, seeds] = seedsLine.split(": ");

  const seedValues = seeds.split(" ").map(seedValue => {
    return parseInt(seedValue) || 0;
  });

  const seedToSoil = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("seed-to-soil"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();
  const soilToFertilizer = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("soil-to-fertilizer"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();
const fertilizerToWater = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("fertilizer-to-water"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();
  const waterToLight = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("water-to-light"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();

  const lightToTemperature = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("light-to-temperature"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();

  const temperatureToHumidity = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("temperature-to-humidity"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();

  const humidityToLocation = Pipe
    .fromValue(lines)
    .next(lines => dropWhile(line => !line.startsWith("humidity-to-location"), lines))
    .next(lines => drop(1, lines))
    .next(lines => takeWhile(line => !Number.isNaN(parseInt(line)), lines))
    .next(lines => lines.map(line => line.split(" ")))
    .next(lines => lines.map(line => line.map(value => parseInt(value))))
    .toValue();

  console.log(humidityToLocation);
}

main().catch(error => {
  console.error(`An error occurred: ${error}`);
});
