/*
 * Name: Progetto FabLab
 * Developer: Link77+ITIS
 * Version: v 0.01
 * */

/* Begin Express imports and configuration as HTTP server */
const express = require('express');
const api = module.exports = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = require('http').Server(api);

/* End Express imports and configuration as HTTP server  */


/* Connection to mySQL */
//const db = require('./config/db'); // Creare la connessione con MYSQL
const db= require('./config/db');


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



/* HTTP server initialization  */
server.listen(8095, '0.0.0.0', function () {
    console.log('LookApp running on socket 0.0.0.0 : 8095');
});