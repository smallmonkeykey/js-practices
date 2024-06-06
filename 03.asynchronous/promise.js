import { createDatabase, runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = createDatabase();

runAsync(db, "CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)")
  .then(() => {
    return runAsync(db, "INSERT INTO books(title) VALUES(?)", [
      "吾輩は猫である",
    ]);
  })
  .then((result) => {
    console.log(`id: ${result.lastID}`);
    return allAsync(db, "SELECT id, title FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`id: ${row.id}, title:${row.title}`);
    });
    return runAsync(db, "DROP TABLE books");
  })
  .then(() => {
    return closeAsync(db);
  });
