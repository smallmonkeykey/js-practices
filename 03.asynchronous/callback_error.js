import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO boo(title) VALUES(?)", ["吾輩は猫である"], (err) => {
      console.error(err.message);

      db.all("SELECT * FROM book WHERE id = 1", function (err) {
        console.error(err.message);

        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    });
  },
);
