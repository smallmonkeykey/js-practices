import readline from 'readline';

class ReceiveStdin {
  getOption() {
    return process.argv[2];
  }

  convertInput() {
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

  async convertInputAsync() {
    try {
      const memoLines = await this.convertInput();
      console.log(memoLines);
      return memoLines;
    } catch (err) {
      console.error(err);
    }
  }
}
