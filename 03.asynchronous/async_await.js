import { createDatabase, runAsync, allAsync, closeAsync } from "./function.js";

async function operateSqlite3() {
  const db = createDatabase();

  const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
   )`;

  try {
    await runAsync(db, createTableQuery);

    const lastId = await runAsync(db, "INSERT INTO books (title) VALUES (?)", [
      "吾輩は猫である",
    ]);
    console.log(lastId);

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
