const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL UNIQUE)";
const insertBookQuery = "INSERT INTO books(title) VALUES(?)";
const selectBookQuery = "SELECT id, title FROM books";
const dropTableQuery = "DROP TABLE books";

export { createTableQuery, insertBookQuery, selectBookQuery, dropTableQuery };
