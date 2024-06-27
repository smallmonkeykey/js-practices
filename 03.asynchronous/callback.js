import sqlite3 from "sqlite3";
import {
  createTableQuery,
  insertBookQuery,
  selectBookQuery,
  dropTableQuery,
} from "./query_variables.js";

const db = new sqlite3.Database(":memory:");

db.run(createTableQuery, () => {
  db.run(insertBookQuery, ["吾輩は猫である"], function () {
    console.log(`id: ${this.lastID}`);

    db.all(selectBookQuery, (_, rows) => {
      rows.forEach((row) => {
        console.log(`id: ${row.id}, title: ${row.title}`);
      });

      db.run(dropTableQuery, () => {
        db.close();
      });
    });
  });
});
