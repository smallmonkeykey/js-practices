import ReceiveStdin from "./ memo_stdin.js";
import MemoDataBase from "./memo_db.js";
import Display from "./memo_display.js";

async function main() {
  const receivedStdin = new ReceiveStdin();
  const option = receivedStdin.getOption();

  if (option === undefined) {
    const memoContent = await receivedStdin.convertInputAsync();
    const memoTitle = memoContent[0];
    const memoDataBase = await new MemoDataBase();
    await memoDataBase.insertMemoBody(memoTitle, memoContent);
  }

  if (option === "-l") {
    const memoDataBase = await new MemoDataBase();
    const memoAllDate = await memoDataBase.getAllMemosDate();
    const displayingMemo = await new Display(memoAllDate);
    displayingMemo.displayMemoTitleList();
  }

  if (option === "-r") {
    const memoDataBase = await new MemoDataBase();
    const memoAllDate = await memoDataBase.getAllMemosDate();

    if (Object.keys(memoAllDate).length === 0) {
      console.log("メモを入力してください");
    } else {
      const displayingMemo = await new Display(memoAllDate);
      displayingMemo.referMemos();
    }
  }

  if (option == "-d") {
    const memoDataBase = await new MemoDataBase();
    const memoAllDate = await memoDataBase.getAllMemosDate();

    if (Object.keys(memoAllDate).length === 0) {
      console.log("メモを入力してください");
    } else {
      const displayingMemo = await new Display(memoAllDate);
      displayingMemo.deleteMemos();
    }
  }
}

main();
