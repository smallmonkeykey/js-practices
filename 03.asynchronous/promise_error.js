import { createDatabase, runAsync, allAsync, closeAsync } from "./function.js";

const db = createDatabase();

const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
)`;

runAsync(db, createTableQuery)
  .then(() => {
    return runAsync(db, "INSERT INTO boo (title) VALUES (?)", [
      "吾輩は猫である",
    ]);
  })
  .catch((err) => {
    console.error(err.message);
    return allAsync(db, "SELECT id, title FROM book");
  })
  .catch((err) => {
    console.error(err.message);
    return runAsync(db, "DROP TABLE books");
  })
  .then(() => {
    return closeAsync(db);
  });
