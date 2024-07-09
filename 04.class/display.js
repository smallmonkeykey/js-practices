import MemoDataBase from "./memo_db.js";
import pkg from "enquirer";
const { prompt } = pkg;

export default class Display {
  constructor(allMemos) {
    this.allMemos = allMemos;

    this.memoTitles = allMemos.map((memoDate) => memoDate.title);

    this.allMemosChangedKeyName = allMemos.map((item) => {
      return {
        id: item.id,
        name: item.title,
        value: item.content,
      };
    });

    this.allMemosChangedKeyNameWithoutId = allMemos.map((item) => {
      return {
        name: item.title,
        value: item.id,
      };
    });
  }

  displayMemoTitleList() {
    this.allMemos.forEach((row) => {
      console.log(`${row.title}`);
    });
  }

  async referMemos() {
    const response = await prompt({
      type: "select",
      name: "memoTitle",
      message: "Choose a note you want to see:",
      choices: this.allMemosChangedKeyName,
      result(names) {
        return this.map(names);
      },
    });
    console.log(Object.values(response.memoTitle)[0]);
  }

  async deleteMemos() {
    const response = await prompt({
      type: "select",
      name: "memoTitle",
      message: "Choose a memo you want to delete:",
      choices: this.allMemosChangedKeyNameWithoutId,
      result(names) {
        return this.map(names);
      },
    });

    const memoId = Object.values(response.memoTitle)[0];
    const memoDataBase = new MemoDataBase();
    await memoDataBase.deleteMemo(memoId);
  }
}
