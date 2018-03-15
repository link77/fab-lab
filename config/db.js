const mysql = require('mysql');


const config={
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'fablab'
};


const connection = mysql.createConnection(config);
connection.connect((err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database '+ config.database);
    }
});
module.exports = connection;