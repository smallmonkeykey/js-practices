import { createDatabase, runAsync, allAsync, closeAsync } from "./db_async_functions.js";

const db = createDatabase();

runAsync(db, "CREATE TABLE books(id INTEGER AUTO_INCREMENT PRIMARY KEY,title VARCHAR NOT NULL UNIQUE)")
  .then(() => {
    return runAsync(db, "INSERT INTO boo(title) VALUES(?)", [
      "吾輩は猫である",
    ]);
  })
  .catch((err) => {
    console.error(err.message);
    return allAsync(db, "SELECT id, title FROM book");
  })
  .catch((err) => {
    console.error(err.message);
    return runAsync(db, "DROP TABLE books");
  })
  .then(() => {
    return closeAsync(db);
  });
