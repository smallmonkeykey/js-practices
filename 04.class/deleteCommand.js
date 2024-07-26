import Enquirer from "./enquirer.js";
import MemoDataBase from "./memoDB.js";

export default class DeleteCommand {
  constructor(allMemos) {
    this.allMemosChangedKeyNameWithoutId = allMemos.map((item) => {
      return {
        name: item.title,
        value: item.id,
      };
    });
  }

  async deleteMemos() {
    const enquirer = new Enquirer();
    const memoId = await enquirer.selectMemo(
      this.allMemosChangedKeyNameWithoutId,
      "delete",
    );
    const memoDataBase = new MemoDataBase();
    await memoDataBase.delete(memoId);
  }
}
