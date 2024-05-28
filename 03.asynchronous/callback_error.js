import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':memory:');

const createTableQuery = `CREATE TABLE books(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE
)`;

db.run(createTableQuery, function (err) {
    if (err) console.error(err.message);

    db.run('INSERT INTO books (id, title) VALUES (?, ?)',['1','吾輩は猫である'], function (err) {
        if (err) console.error(err.message);
        console.log(`id: ${this.lastID}`)
    
        db.all('SELECT * FROM books', function (err, rows) {
            if (err) {
                console.error(err.message)
            } else {
                rows.forEach((row) => {
                console.log(`id: ${row.id}, title:${row.title}`);
                });
            }
        });
    });
    
});

db.close();
