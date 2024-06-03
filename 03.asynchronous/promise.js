import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
)`;

const createTable = new Promise((resolve) => {
  db.run(createTableQuery, () => {
    resolve();
  });
});

createTable
  .then(() => {
    return new Promise((resolve) => {
      db.run(
        "INSERT INTO books (title) VALUES (?)",
        ["吾輩は猫である"],
        function () {
          resolve(this.lastID);
        },
      );
    });
  })
  .then((id) => {
    console.log(`id: ${id}`);
    return new Promise((resolve) => {
      db.all("SELECT id, title FROM books", (err, rows) => {
        resolve(rows);
      });
    });
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`id: ${row.id}, title:${row.title}`);
    });
    return new Promise((resolve) => {
      db.run("DROP TABLE books", () => {
        resolve("テーブルを削除しました");
      });
    });
  })
  .then((message) => {
    console.log(message);
    new Promise((resolve) => {
      db.close(() => {
        resolve;
      });
    });
  });
