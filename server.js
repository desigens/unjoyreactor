var express = require('express');
var bodyParser = require('body-parser');

var download = require('./download');
var d = new download();

var crop = require('./crop');
var c = new crop();

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

	if (!req.param('url')) {
		res.send(404);
	}

  	d.url(req.param('url'), function (hex) {
  		c.img('images/' + hex, function (image) {
  			res.type('jpg');
  			res.sendfile(image);
  		})
  	});
});

app.listen(5000);

// http://localhost:3000/images/65ae8fde9ea8daa409ae264407e6893c