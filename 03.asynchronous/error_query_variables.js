const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL UNIQUE)";
const insertBookErrorQuery = "INSERT INTO boo(title) VALUES(?)";
const selectBookErrorQuery = "SELECT id, title FROM book";
const dropTableQuery = "DROP TABLE books";

export {
  createTableQuery,
  insertBookErrorQuery,
  selectBookErrorQuery,
  dropTableQuery,
};
