import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertBookQuery,
  selectBookQuery,
  dropTableQuery,
} from "./query_variables.js";
import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = new sqlite3.Database(":memory:");

await runAsync(db, createTableQuery);

const result = await runAsync(db, insertBookQuery, ["吾輩は猫である"]);
console.log(`id: ${result.lastID}`);

const rows = await allAsync(db, selectBookQuery);
rows.forEach((row) => {
  console.log(`id: ${row.id}, title: ${row.title}`);
});

await runAsync(db, dropTableQuery);

await closeAsync(db);
