import MemoDataBase from "./memoDB.js";
import Enquirer from "./enquirer.js";
import { getOption, convertInputAsync } from "./stdin.js";

export default class MemoApp {
  constructor() {
    const option = getOption();
    this.option = option;
  }

  async run() {
    const memoDataBase = new MemoDataBase("./memo.db");
    const allMemos = await memoDataBase.getAll();

    switch (this.option) {
      case undefined: {
        await this.input();
        break;
      }
      case "-l": {
        this.list(allMemos);
        break;
      }
      case "-r": {
        if (Object.keys(allMemos).length === 0) {
          console.log("メモを入力してください");
        } else {
          await this.refer(allMemos);
        }
        break;
      }
      case "-d": {
        if (Object.keys(allMemos).length === 0) {
          console.log("メモを入力してください");
        } else {
          await this.delete(allMemos);
        }
        break;
      }
    }
  }

  async input() {
    const content = await convertInputAsync();
    const title = content[0];
    const memoDataBase = await new MemoDataBase("./memo.db");
    await memoDataBase.insert(title, content);
  }

  list(allMemos) {
    allMemos.forEach((row) => {
      console.log(`${row.title}`);
    });
  }

  async refer(allMemos) {
    const allMemosChangedKeyName = allMemos.map((item) => {
      return {
        id: item.id,
        name: item.title,
        value: item.content,
      };
    });

    const enquirer = new Enquirer(allMemosChangedKeyName);
    const result = await enquirer.selectMemo("action");
    console.log(result);
  }

  async delete(allMemos) {
    const allMemosChangedKeyNameWithoutId = allMemos.map((item) => {
      return {
        name: item.title,
        value: item.id,
      };
    });

    const enquirer = new Enquirer(allMemosChangedKeyNameWithoutId);
    const id = await enquirer.selectMemo("delete");
    const memoDataBase = new MemoDataBase("./memo.db");
    await memoDataBase.delete(id);
  }
}
