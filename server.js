/*
 * Name: Progetto FabLab
 * Developer: Link77+ITIS
 * Version: v 0.01
 * */

/* Begin Express imports and configuration as HTTP server */
const express = require('express');
const router=express.Router();
const api = module.exports = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = require('http').Server(api);
const users= require('./controllers/users_controller')(router);

/* End Express imports and configuration as HTTP server  */


/* Connection to mySQL */
//const db = require('./config/db'); // Creare la connessione con MYSQL
const db=('./config/db');


/* Begin api config */
api.use(cors());
api.disable('x-powered-by');
api.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
api.use(bodyParser.json({
    limit: '50mb'
}));
api.use(morgan('dev'));
api.use(express.static('www')); // Angular static files

/* End api config */


/* CREARE QUI I VARI ROUTING  */
/* Esempio:
/* https://medium.com/@avanthikameenakshi/building-restful-api-with-nodejs-and-mysql-in-10-min-ff740043d4be */
api.use('/api/v1/users', users);





/* HTTP server initialization  */
server.listen(8095, '127.0.0.1', function () {
    console.log('LookApp running on socket 0.0.0.0 : 8095');
});