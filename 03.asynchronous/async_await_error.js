import { runAsync, allAsync, closeAsync } from "./db_async_functions.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

try {
  await runAsync(
    db,
    "CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)",
  );

  try {
    const lastId = await runAsync(db, "INSERT INTO boo(title) VALUES(?)", [
      "吾輩は猫である",
    ]);
    console.log(lastId);
  } catch (err) {
    console.log(err.message);
  }

  try {
    const rows = await allAsync(db, "SELECT id, title FROM book");
    rows.forEach((row) => {
      console.log(`id: ${row.id}, title: ${row.title}`);
    });
  } catch (err) {
    console.log(err.message);
  }

  const rows = await allAsync(db, "SELECT id, title FROM books");
  rows.forEach((row) => {
    console.log(`id: ${row.id}, title:${row.title}`);
  });
} finally {
  await runAsync(db, "DROP TABLE books");
  await closeAsync(db);
}
