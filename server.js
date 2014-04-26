var express = require('express');
var bodyParser = require('body-parser');

var download = require('./download');
var d = new download();

var app = express();

app.use(bodyParser());

app.get('/images/:hash', function(req, res){  	
	res.type('jpg');
  	res.sendfile('images/' + req.params.hash);
});

app.get('/download/:hash', function(req, res){  	
  	res.sendfile('images/' + req.params.hash);
});

app.get('/', function(req, res){
  	res.sendfile('templates/index.html');
});

app.post('/', function(req, res){
  	d.url(req.param('url'), function (hex) {

  		// res.send(hex);

  		res.type('jpg');
  		res.sendfile('images/' + hex);
  	});
});

app.listen(3000);

// http://localhost:3000/images/65ae8fde9ea8daa409ae264407e6893c