import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

function runAsync(sql, values) {
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

function allAsync(sql) {
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

function closeAsync(sql) {
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

const createTableQuery = `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
)`;

runAsync(createTableQuery)
    .then(() => {
      return runAsync("INSERT INTO books (title) VALUES (?)",["吾輩は猫である"])
    })
    .then((id) => {
      console.log(id)
      return allAsync("SELECT id, title FROM books")
    })
    .then((rows) => {
      rows.forEach((row) => {
				console.log(`id: ${row.id}, title:${row.title}`);
			});
			return runAsync("DROP TABLE books")
		})
	.then(() => {
		return closeAsync()
	})

export {runAsync, allAsync, closeAsync}; 
