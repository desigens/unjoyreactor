var express = require('express');
var bodyParser = require('body-parser');

var download = require('./download');
var d = new download();

var app = express();

app.use(bodyParser());

app.get('/', function(req, res){
  	res.sendfile('templates/index.html');
});

app.post('/', function(req, res){
  	d.url(req.param('url'), function (hex) {
  		res.send(hex);
  	});
});

app.listen(3000);