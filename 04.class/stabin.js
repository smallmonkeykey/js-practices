import readline from "readline";

function getOption() {
  return process.argv[2];
}

function convertInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let memoLines = [];

    rl.on("line", (line) => {
      memoLines.push(line);
    });

    rl.on("close", () => {
      resolve(memoLines);
    });
  });
}

async function convertInputAsync() {
  try {
    return await convertInput();
  } catch (err) {
    console.error(err);
  }
}

export { getOption, convertInputAsync };
