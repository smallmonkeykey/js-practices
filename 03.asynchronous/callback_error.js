import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertBookErrorQuery,
  selectBookErrorQuery,
  dropTableQuery,
} from "./error_query_variables.js";

const db = new sqlite3.Database(":memory:");

db.run(createTableQuery, () => {
  db.run(insertBookErrorQuery, ["吾輩は猫である"], (err) => {
    console.error(err.message);

    db.all(selectBookErrorQuery, (err) => {
      console.error(err.message);

      db.run(dropTableQuery, () => {
        db.close();
      });
    });
  });
});
