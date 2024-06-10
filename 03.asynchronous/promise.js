import sqlite3 from "sqlite3";
import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL UNIQUE)";
const insertTitleQuery = "INSERT INTO books(title) VALUES(?)";
const selectBookQuery = "SELECT id, title FROM books";
const dropTableQuery = "DROP TABLE books";

runAsync(db, createTableQuery)
  .then(() => runAsync(db, insertTitleQuery, ["吾輩は猫である"]))
  .then((result) => {
    console.log(`id: ${result.lastID}`);
    return allAsync(db, selectBookQuery);
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`id: ${row.id}, title: ${row.title}`);
    });
    return runAsync(db, dropTableQuery);
  })
  .then(() => closeAsync(db));
