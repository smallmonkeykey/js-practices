import { createDatabase, runAsync, allAsync, closeAsync } from "./db_async_functions.js";

async function operateSqlite3() {
  const db = createDatabase();

  try {
    await runAsync(db, "CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)");

    const result = await runAsync(db, "INSERT INTO books(title) VALUES(?)", [
      "吾輩は猫である",
    ]);
    console.log(`id: ${result.lastID}`);

    const rows = await allAsync(db, "SELECT id, title FROM books");
    rows.forEach((row) => {
      console.log(`id: ${row.id}, title: ${row.title}`);
    });
  } finally {
    await runAsync(db, "DROP TABLE books");
    await closeAsync(db);
  }
}

operateSqlite3();
