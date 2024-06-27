import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertBookErrorQuery,
  selectBookErrorQuery,
  dropTableQuery,
} from "./error_query_variables.js";
import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = new sqlite3.Database(":memory:");

runAsync(db, createTableQuery)
  .then(() => runAsync(db, insertBookErrorQuery, ["吾輩は猫である"]))
  .catch((err) => {
    console.error(err.message);
    return allAsync(db, selectBookErrorQuery);
  })
  .catch((err) => {
    console.error(err.message);
    return runAsync(db, dropTableQuery);
  })
  .then(() => closeAsync(db));
