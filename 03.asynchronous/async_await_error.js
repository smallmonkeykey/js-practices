import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

try {
  await runAsync(
    db,
    "CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)",
  );

  await runAsync(db, "INSERT INTO boo(title) VALUES(?)", [ "吾輩は猫である",]);
} catch (err) {
    console.error(err.message);
}

try {
  await allAsync(db, "SELECT id, title FROM book")
} catch (err) {
    console.error(err.message);
}

try {
  await runAsync(db, "DROP TABLE books");
  await closeAsync(db);
} catch (err) {
    console.error(err.message);
}
