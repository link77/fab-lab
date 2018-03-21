const mysql = require('mysql');


const config={
    host: 'cloud.link77.eu',
    port: 3306,
    user: 'fablab',
    password:'a3d92-FT',
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