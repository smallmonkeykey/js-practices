import ReceiveStdin from "./receiveStdin.js";
import MemoDataBase from "./memoDB.js";

export default class InputCommand {
  async inputMemo() {
    const receivedStdin = new ReceiveStdin();
    const memoContent = await receivedStdin.convertInputAsync();
    const memoTitle = memoContent[0];
    const memoDataBase = await new MemoDataBase();
    await memoDataBase.insert(memoTitle, memoContent);
  }
}
