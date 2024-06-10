import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL UNIQUE)";
const insertTitleQuery = "INSERT INTO books(title) VALUES(?)";
const selectBookQuery = "SELECT id, title FROM books";
const dropTableQuery = "DROP TABLE books";

db.run(createTableQuery, () => {
  db.run(insertTitleQuery, ["吾輩は猫である"], function () {
    console.log(`id: ${this.lastID}`);

    db.all(selectBookQuery, (unusedVariable, rows) => {
      rows.forEach((row) => {
        console.log(`id: ${row.id}, title: ${row.title}`);
      });

      db.run(dropTableQuery, () => {
        db.close();
      });
    });
  });
});
