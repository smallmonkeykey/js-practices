export default class ListCommand {
  constructor(allMemos) {
    this.allMemos = allMemos;
    this.memoTitles = allMemos.map((memoDate) => memoDate.title);
  }

  listMemos() {
    this.allMemos.forEach((row) => {
      console.log(`${row.title}`);
    });
  }
}
