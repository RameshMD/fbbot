var express = require('express');
var app = express();

var config = require("./config");
console.log("Config"+config);

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
});

// Facebook validation
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === config.secretKey) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
});

app.listen(config.port);
