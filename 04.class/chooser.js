import pkg from "enquirer";
const { prompt } = pkg;

export default class Chooser {
  constructor(selectableMemos) {
    this.selectableMemos = selectableMemos;
  }

  async selectMemo(action) {
    const response = await prompt({
      type: "select",
      name: "title",
      message: `Choose a memo you want to ${action}:`,
      choices: this.selectableMemos,
      result(names) {
        return this.map(names);
      },
    });
    return Object.values(response.title)[0];
  }
}
