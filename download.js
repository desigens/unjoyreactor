var Download = function () {

};

var request = require('request');
var fs = require('fs');
var crypto = require('crypto');

Download.prototype.url = function (url, callback) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(url);
	var hex = md5sum.digest('hex');
	var path = 'images/' + hex;

	if (!fs.existsSync(path)) {
		request.get({
			url: url,
			encoding: 'binary'
		}, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        fs.writeFile(path, body, 'binary', function(err){
		            if (err) throw err
		            console.log('File saved.')

		        	if (callback) callback(hex);

		        })
		    }
		});
	} else {
		console.log('File was on disk')
		if (callback) callback(hex);
	}
}

module.exports = Download;