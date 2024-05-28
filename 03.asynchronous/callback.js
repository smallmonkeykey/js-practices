import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':memory:');

const createTableQuery = `CREATE TABLE books(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE
)`;

db.run(createTableQuery, function (err) {

    db.run('INSERT INTO books (id, title) VALUES (?, ?)',['1','吾輩は猫である'], function (err) {
        console.log(`id: ${this.lastID}`)
    
        db.all('SELECT * FROM books', function (err, rows) {
                rows.forEach((row) => {
                console.log(`id: ${row.id}, title:${row.title}`);
                });
        });
    });
    
});

db.close();

