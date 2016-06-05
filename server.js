var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json());


var config = require("./config");
console.log("Config"+config.token);

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

app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i]
		sender = event.sender.id
		if (event.message && event.message.text) {
		message  = event.message.text
			console.log("#################", message);
			console.log("#################", sender);
      // GetMovieName(sender,text)
    //  IsValidProperty(sender,prop);
		SendInfoToUser(sender, message);
	}
	}
	res.sendStatus(200)
})

function SendInfoToUser(senderId, message){
  messageData = {
    text:message
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:config.token},
    method: 'POST',
    json: {
      recipient: {id:senderId},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

app.listen(config.port);
