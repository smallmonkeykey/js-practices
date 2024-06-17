import sqlite3 from "sqlite3";
import { runAsync, allAsync } from "./memo_db_async_function.js";

export default class MemoDataBase {
  constructor() {
    this.db = new sqlite3.Database("./memo_date.db");

    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS memos (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					title TEXT NOT NULL,
					content TEXT)`,
      );
    });
  }

  async insertMemoBody(memoTitle, memoContent) {
    const stringMemoContent = memoContent.join("\n");
    await runAsync(this.db, "INSERT INTO memos (title, content) VALUES(?, ?)", [
      memoTitle,
      stringMemoContent,
    ]);
  }

  async deleteMemo(memoId) {
    const result = await runAsync(
      this.db,
      `DELETE FROM memos WHERE id = ${memoId}`,
    );
    console.log(result);
  }

  async getAllMemosDate() {
    const rows = await allAsync(this.db, "SELECT * FROM memos");
    return rows;
  }

  async getTitle() {
    const rows = await allAsync(this.db, "SELECT title FROM memos");
    rows.forEach((row) => {
      console.log(`title: ${row.title}`);
    });
  }
}
