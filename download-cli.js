var request = require('request');
var fs = require('fs');
var url = process.argv[2] || 'http://img0.joyreactor.cc/pics/post/full/Lilyphilia-Комиксы-сделал-сам-Кликабельно-1202849.jpeg';

var crypto = require('crypto');
var md5sum = crypto.createHash('md5');
md5sum.update(url);
var hex = md5sum.digest('hex');

if (!fs.existsSync(hex)) {
	request.get({
		url: url,
		encoding: 'binary'
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        fs.writeFile(hex, body, 'binary', function(err){
	            if (err) throw err
	            console.log('File saved.')
	        })
	    }
	});
}
