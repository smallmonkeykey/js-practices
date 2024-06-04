import { createDatabase, runAsync, allAsync, closeAsync } from "./function.js";

const db = createDatabase();

const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
)`;

runAsync(db, createTableQuery)
  .then(() => {
    return runAsync(db, "INSERT INTO books (title) VALUES (?)", [
      "吾輩は猫である",
    ]);
  })
  .then((id) => {
    console.log(id);
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
