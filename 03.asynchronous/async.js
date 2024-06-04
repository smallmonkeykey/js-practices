import sqlite3 from "sqlite3";

function createDatabase() {
    const db = new sqlite3.Database(':memory:');
    return db;
}

function runAsync(db,sql, values) {
    return new Promise((resolve, reject) => {
        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
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
                reject(err);
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
				reject(err);
			} else {
				resolve();
			}
		})
	})
}

export { createDatabase, runAsync, allAsync, closeAsync }; 
