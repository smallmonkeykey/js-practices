import sqlite3 from "sqlite3";
import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL UNIQUE)";
const insertTitleErrorQuery = "INSERT INTO boo(title) VALUES(?)";
const selectBookErrorQuery = "SELECT id, title FROM book";
const dropTableQuery = "DROP TABLE books";

(async () => {
  await runAsync(db, createTableQuery);

  try {
    await runAsync(db, insertTitleErrorQuery, ["吾輩は猫である"]);
  } catch (err) {
    console.error(err.message);
  }

  try {
    await allAsync(db, selectBookErrorQuery);
  } catch (err) {
    console.error(err.message);
  }

  await runAsync(db, dropTableQuery);
  await closeAsync(db);
})();
