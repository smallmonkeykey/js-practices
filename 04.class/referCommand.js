import Enquirer from "./enquirer.js";

export default class ReferCommand {
  constructor(allMemos) {
    this.allMemosChangedKeyName = allMemos.map((item) => {
      return {
        id: item.id,
        name: item.title,
        value: item.content,
      };
    });
  }

  async referMemos() {
    const enquirer = new Enquirer();
    const result = await enquirer.selectMemo(
      this.allMemosChangedKeyName,
      "action",
    );
    console.log(result);
  }
}
