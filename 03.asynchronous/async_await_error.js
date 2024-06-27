import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertBookErrorQuery,
  selectBookErrorQuery,
  dropTableQuery,
} from "./error_query_variables.js";
import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = new sqlite3.Database(":memory:");

(async () => {
  await runAsync(db, createTableQuery);

  try {
    await runAsync(db, insertBookErrorQuery, ["吾輩は猫である"]);
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  }

  try {
    await allAsync(db, selectBookErrorQuery);
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  }

  await runAsync(db, dropTableQuery);
  await closeAsync(db);
})();
