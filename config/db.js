const mysql = require('mysql');


const connection = mysql.createConnection({
    host: '35.178.13.4',
    user: 'admin',
    password: 'admin123',
    database: 'testDB'
});
connection.connect((err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log('z');
    }
});
