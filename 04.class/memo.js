#!/usr/bin/env node

import ReceiveStdin from "./receive_stdin.js";
import MemoDataBase from "./memo_db.js";
import Display from "./display.js";

async function main() {
  const receivedStdin = new ReceiveStdin();
  const option = receivedStdin.getOption();

  if (option === undefined) {
    const memoContent = await receivedStdin.convertInputAsync();
    const memoTitle = memoContent[0];
    const memoDataBase = await new MemoDataBase();
    await memoDataBase.insert(memoTitle, memoContent);
  }

  if (option === "-l") {
    const memoDataBase = await new MemoDataBase();
    const allMemos = await memoDataBase.getAll();
    const displayingMemo = await new Display(allMemos);
    displayingMemo.displayMemoTitleList();
  }

  if (option === "-r") {
    const memoDataBase = await new MemoDataBase();
    const allMemos = await memoDataBase.getAll();

    if (Object.keys(allMemos).length === 0) {
      console.log("メモを入力してください");
    } else {
      const displayingMemo = await new Display(allMemos);
      displayingMemo.referMemos();
    }
  }

  if (option === "-d") {
    const memoDataBase = await new MemoDataBase();
    const allMemos = await memoDataBase.getAll();

    if (Object.keys(allMemos).length === 0) {
      console.log("メモを入力してください");
    } else {
      const displayingMemo = await new Display(allMemos);
      displayingMemo.deleteMemos();
    }
  }
}

main();
