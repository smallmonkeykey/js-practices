import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL UNIQUE)";
const insertTitleErrorQuery = "INSERT INTO boo(title) VALUES(?)";
const selectBookErrorQuery = "SELECT id, title FROM book";
const dropTableQuery = "DROP TABLE books";

db.run(createTableQuery, () => {
  db.run(insertTitleErrorQuery, ["吾輩は猫である"], (err) => {
    console.error(err.message);

    db.all(selectBookErrorQuery, function (err) {
      console.error(err.message);

      db.run(dropTableQuery, () => {
        db.close();
      });
    });
  });
});
