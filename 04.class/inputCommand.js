import ReceiveStdin from "./receive_stdin.js";
import MemoDataBase from "./memo_db.js";

export default class InputCommand {
  async inputMemo() {
    const receivedStdin = new ReceiveStdin();
    const memoContent = await receivedStdin.convertInputAsync();
    const memoTitle = memoContent[0];
    const memoDataBase = await new MemoDataBase();
    await memoDataBase.insert(memoTitle, memoContent);
  }
}
