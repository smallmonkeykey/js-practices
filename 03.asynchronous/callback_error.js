import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)", function (err) {
  if (err) console.error(err.message);

  db.run(
      "INSERT INTO boo(title) VALUES(?)", [
      "吾輩は猫である",
    ],
     (err) => {
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
            db.close();
          });
        });
      }
    },
  );
});
