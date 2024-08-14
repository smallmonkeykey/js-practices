import sqlite3 from "sqlite3";
export default class MemoDataBase {
  constructor(filePath) {
    this.db = new sqlite3.Database(filePath);

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
    await this.#runAsync(
      this.db,
      "INSERT INTO memos (title, content) VALUES(?, ?)",
      [memoTitle, stringMemoContent],
    );
  }

  async delete(memoId) {
    await this.#runAsync(this.db, `DELETE FROM memos WHERE id = ${memoId}`);
  }

  async getAll() {
    const rows = await this.#allAsync(
      this.db,
      "SELECT * FROM memos ORDER BY id ASC",
    );
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
}
