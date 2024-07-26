import MemoDataBase from "./memo_db.js";
import InputCommand from "./inputCommand.js";
import ListCommand from "./listCommand.js";
import ReferCommand from "./referCommand.js";
import DeleteCommand from "./deleteCommand.js";

export default class MemoApp {
  constructor(option) {
    this.option = option;
  }

  async run() {
    const memoDataBase = await new MemoDataBase();
    const allMemos = await memoDataBase.getAll();

    switch (this.option) {
      case undefined: {
        const inputCommand = new InputCommand();
        inputCommand.inputMemo();
        break;
      }
      case "-l": {
        const listCommand = await new ListCommand(allMemos);
        listCommand.listMemos();
        break;
      }
      case "-r": {
        if (Object.keys(allMemos).length === 0) {
          console.log("メモを入力してください");
        } else {
          const referCommand = await new ReferCommand(allMemos);
          referCommand.referMemos();
        }
        break;
      }
      case "-d": {
        if (Object.keys(allMemos).length === 0) {
          console.log("メモを入力してください");
        } else {
          const deletingMemo = await new DeleteCommand(allMemos);
          deletingMemo.deleteMemos();
        }
        break;
      }
    }
  }
}
