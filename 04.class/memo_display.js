import MemoDataBase from "./memo_db.js";
import pkg from "enquirer";
const { prompt } = pkg;

export default class Display {
  constructor(memoAllDate) {
    this.memoAllDate = memoAllDate;

    this.memoTitles = memoAllDate.map((memoDate) => memoDate.title);

    this.memoAllDateChangedKeyName = memoAllDate.map((item) => {
      return {
        id: item.id,
        name: item.title,
        value: item.content,
      };
    });

    this.memoAllDateChangedKeyNameNew = memoAllDate.map((item) => {
      return {
        name: item.title,
        value: item.id,
      };
    });
  }

  displayMemoTitleList() {
    this.memoAllDate.forEach((row) => {
      console.log(`${row.title}`);
    });
  }

  async referMemos() {
    const response = await prompt({
      type: "select",
      name: "memoTitle",
      message: "Choose a note you want to see:",
      choices: this.memoAllDateChangedKeyName,
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
      choices: this.memoAllDateChangedKeyNameNew,
      result(names) {
        return this.map(names);
      },
    });

    const memoId = Object.values(response.memoTitle)[0];
    const memoDataBase = new MemoDataBase();
    await memoDataBase.deleteMemo(memoId);
  }
}
