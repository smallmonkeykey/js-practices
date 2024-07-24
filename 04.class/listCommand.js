export default class ListCommand {
  constructor(allMemos) {
    this.allMemos = allMemos;
    this.memoTitles = allMemos.map((memoDate) => memoDate.title);
  }

  displayMemoTitleList() {
    this.allMemos.forEach((row) => {
      console.log(`${row.title}`);
    });
  }
}
