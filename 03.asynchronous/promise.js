import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertBookQuery,
  selectBookQuery,
  dropTableQuery,
} from "./query_variables.js";
import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = new sqlite3.Database(":memory:");

runAsync(db, createTableQuery)
  .then(() => runAsync(db, insertBookQuery, ["吾輩は猫である"]))
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
