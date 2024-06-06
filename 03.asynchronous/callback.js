import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)", function () {
  db.run(
    "INSERT INTO books(title) VALUES(?)", [
    "吾輩は猫である",
  ],
     () => {
      console.log(`id: ${this.lastID}`);

      db.all("SELECT * FROM books", (err, rows) => {
        rows.forEach((row) => {
          console.log(`id: ${row.id}, title:${row.title}`);
        });

        db.run("DROP TABLE books", function () {
          db.close();
        });
      });
    },
  );
});
