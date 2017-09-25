"use strict";
// Include Server Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
//can only use es2015 once NodeJS supports it
// import express from 'express';
// import bodyParser from 'body-parser';
// import logger from 'morgan';

//create instance of express
let app = express();
let PORT = process.env.PORT || 3000;

// run morgan for logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//make the public folder a static directory
app.use(express.static('./public'));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
	console.log('app listening on PORT: ' + PORT);
});