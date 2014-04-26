var Download = function () {

};

var request = require('request');
var fs = require('fs');
var crypto = require('crypto');

Download.prototype.url = function (url, callback) {
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

		        	if (callback) callback(hex);

		        })
		    }
		});
	} else {
		if (callback) callback(hex);
	}
}

module.exports = Download;