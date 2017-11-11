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
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//make the public folder a static directory
app.use(express.static('./public'));
//app.use(express.static(path.join(__dirname, 'public')));

//route to send POST requests to conduct a property search
app.post('/calculate-investment-property', function(request, response){
	let rb = request.body;
	let formFields = rb.fields;
	let tierOne = rb.tierOne;
	let tierTwo = rb.tierTwo;
	let unresolved = [];
	let suggestionObject = {};
	if(!formFields.purchasePrice[0].validation.validEntry){
		unresolved.push(formFields.purchasePrice[0].name);
	}
	tierOne.map((tierOneName, i) => {
		tierTwo[i].map( (tierTwoName, j) => {
			formFields[tierOneName][tierTwoName.obj].map( (contents, k) => {
				if(contents.required && !contents.validation.validEntry){
					unresolved.push(contents.name);
				}
			});
		});
	});
	response.send(unresolved);
});

// Main "/" Route. This will redirect the user to the rendered React application
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
	console.log('app listening on PORT: ' + PORT);
});