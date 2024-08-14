import pkg from "enquirer";
const { prompt } = pkg;

export default class Enquirer {
  async selectMemo(memos, action) {
    const response = await prompt({
      type: "select",
      name: "title",
      message: `Choose a memo you want to ${action}:`,
      choices: memos,
      result(names) {
        return this.map(names);
      },
    });
    return Object.values(response.title)[0];
  }
}
