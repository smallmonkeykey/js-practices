import pkg from "enquirer";
const { prompt } = pkg;

export default class Enquirer {
  constructor(memos) {
    this.memos = memos;
  }

  async selectMemo(action) {
    const response = await prompt({
      type: "select",
      name: "title",
      message: `Choose a memo you want to ${action}:`,
      choices: this.memos,
      result(names) {
        return this.map(names);
      },
    });
    return Object.values(response.title)[0];
  }
}
