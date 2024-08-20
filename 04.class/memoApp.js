import MemoDataBase from "./memoDB.js";
import Chooser from "./chooser.js";
import { getOption, convertInputAsync } from "./stdin.js";

export default class MemoApp {
  constructor() {
    const option = getOption();
    this.option = option;
  }

  async run() {
    const memoDataBase = new MemoDataBase("./memo.db");
    const memos = await memoDataBase.getAll();

    switch (this.option) {
      case undefined: {
        await this.input();
        break;
      }
      case "-l": {
        this.list(memos);
        break;
      }
      case "-r": {
        if (Object.keys(memos).length === 0) {
          console.log("メモを入力してください");
        } else {
          await this.refer(memos);
        }
        break;
      }
      case "-d": {
        if (Object.keys(memos).length === 0) {
          console.log("メモを入力してください");
        } else {
          await this.delete(memos);
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

  list(memos) {
    memos.forEach((row) => {
      console.log(`${row.title}`);
    });
  }

  async refer(memos) {
    const selectableMemos = memos.map((item) => {
      return {
        id: item.id,
        name: item.title,
        value: item.content,
      };
    });

    const chooser = new Chooser(selectableMemos);
    const result = await chooser.selectMemo("action");
    console.log(result);
  }

  async delete(memos) {
    const selectableMemos = memos.map((item) => {
      return {
        name: item.title,
        value: item.id,
      };
    });

    const chooser = new Chooser(selectableMemos);
    const id = await chooser.selectMemo("delete");
    const memoDataBase = new MemoDataBase("./memo.db");
    await memoDataBase.delete(id);
  }
}
