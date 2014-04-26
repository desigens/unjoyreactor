var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser());

app.get('/', function(req, res){
  	res.sendfile('templates/index.html');
});

app.post('/', function(req, res){
  	res.send(req.param('url'));
});

app.listen(3000);