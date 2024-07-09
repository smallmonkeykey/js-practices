import sqlite3 from "sqlite3";
import { runAsync, allAsync } from "./memo_db_async_function.js";

export default class MemoDataBase {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");

    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS memos (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					title TEXT NOT NULL,
					content TEXT)`,
      );
    });
  }

  async insert(memoTitle, memoContent) {
    const stringMemoContent = memoContent.join("\n");
    await runAsync(this.db, "INSERT INTO memos (title, content) VALUES(?, ?)", [
      memoTitle,
      stringMemoContent,
    ]);
  }

  async delete(memoId) {
    await runAsync(this.db, `DELETE FROM memos WHERE id = ${memoId}`);
  }

  async getAll() {
    const rows = await allAsync(this.db, "SELECT * FROM memos");
    return rows;
  }

  #runAsync(db, sql, values) {
    return new Promise((resolve, reject) => {
      db.run(sql, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  #allAsync(db, sql) {
    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  #closeAsync(db) {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
