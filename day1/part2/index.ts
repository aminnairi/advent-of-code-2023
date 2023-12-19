import * as FileSystem from "fs/promises";

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
  const buffer: Buffer = await FileSystem.readFile("input.txt");

  const text: string = buffer.toString();

  const lines: Array<string> = text.split("\n");

  const linesWithoutEmptyLines = lines.filter(line => {
    return line.trim().length !== 0;
  });

  const linesWithCharacters: Array<Array<string>> = linesWithoutEmptyLines.map(line => {
    return line
      .replace("nine", "9e")
      .replace("eight", "8t")
      .replace("seven", "7n")
      .replace("six", "6x")
      .replace("five", "5e")
      .replace("four", "4r")
      .replace("three", "3e")
      .replace("two", "2o")
      .replace("one", "1e")
      .split("");
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

  const calibrations: number = linesWithCalibration.reduce((sum, calibration) => {
    return sum + calibration;
  }, 0);

  const output = String(calibrations);

  await FileSystem.writeFile("output.txt", output);
};

main().catch(error => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
});
