import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

try {
  await runAsync(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR NOT NULL UNIQUE)",
  );

  const result = await runAsync(db, "INSERT INTO books(title) VALUES(?)", [
    "吾輩は猫である",
  ]);
  console.log(`id: ${result.lastID}`);

  const rows = await allAsync(db, "SELECT id, title FROM books");
  rows.forEach((row) => {
    console.log(`id: ${row.id}, title: ${row.title}`);
  });
  await runAsync(db, "DROP TABLE books");
  await closeAsync(db);
} catch (err) {
  console.error(err.message);
}
