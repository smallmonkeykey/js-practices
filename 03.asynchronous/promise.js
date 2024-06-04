import sqlite3 from "sqlite3";

function createDatabase() {
    const db = new sqlite3.Database(':memory:');
    return db;
}

function runAsync(db,sql, values) {
    return new Promise((resolve, reject) => {
        db.run(sql, values, function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(this.lastID);
            }
        })
    })
}

function allAsync(db, sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        })
    })
}

function closeAsync(db, sql) {
	return new Promise((resolve, reject) => {
		db.close((err) => {
			if (err) {
				reject(err.message);
			} else {
				resolve();
			}
		})
	})
}

const db = createDatabase();

const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
)`;

runAsync(db, createTableQuery)
    .then(() => {
      return runAsync(db, "INSERT INTO books (title) VALUES (?)",["吾輩は猫である"])
    })
    .then((id) => {
      console.log(id)
      return allAsync(db, "SELECT id, title FROM books")
    })
    .then((rows) => {
      rows.forEach((row) => {
				console.log(`id: ${row.id}, title:${row.title}`);
			});
			return runAsync(db, "DROP TABLE books")
		})
	.then(() => {
		return closeAsync(db)
	})

export {runAsync, allAsync, closeAsync}; 
