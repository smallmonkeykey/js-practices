import { createDatabase, runAsync, allAsync, closeAsync } from "./db_async_functions.js";

async function operateSqlite3() {
  const db = createDatabase();

  const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
   )`;

  try {
    await runAsync(db, createTableQuery);

    try {
      const lastId = await runAsync(db, "INSERT INTO boo (title) VALUES (?)", [
        "吾輩は猫である",
      ]);
      console.log(lastId);
    } catch (err) {
      console.log(err.message);
    }

    try {
      const rows = await allAsync(db, "SELECT id, title FROM book");
      rows.forEach((row) => {
        console.log(`id: ${row.id}, title:${row.title}`);
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
}

operateSqlite3();
