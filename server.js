var express = require('express');
var app = express();

var config = require("./config");
console.log("Config"+config);

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
});

app.listen(config.port);
