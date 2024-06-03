import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

const createTableQuery = `CREATE TABLE books(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE
)`;

db.run(createTableQuery, function (err) {
  if (err) console.error(err.message);

  db.run(
    "INSERT INTO books (title) VALUES (?, ?)",
    ["吾輩は猫である"],
    function (err) {
      if (err) {
        console.error(err.message);

        db.all("SELECT * FROM book WHERE id = 1", function (err) {
          if (err) {
            console.error(err.message);
          }

          db.run("DROP TABLE books", function (err) {
            if (err) {
              console.error(err.message);
            }
            console.log("テーブルを削除しました");
          });
        });
      }
    },
  );
});

db.close();
