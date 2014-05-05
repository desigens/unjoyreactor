var Crop = function () {

};

var gm = require('gm');

// While fix is not implemented: https://github.com/aheckmann/gm/pull/275
gm.prototype.repage = function repage (width, height, xoff, yoff, arg) {
	if (arguments[0] === "+") return this.out("+repage");
	return this.out("-repage", width+'x'+height+'+'+xoff+'+'+yoff+(arg||''));
}

var imageMagick = gm.subClass({ imageMagick: true });

// joyreactor: 14
// failblog: 21

Crop.prototype.img = function (image, callback) {

	imageMagick(image)
		.coalesce()
		.repage(0,0,0,0)
		.crop('100%', '100%', 0, -14)
		.repage('+')
		// .resize(200)
		.write(image + '_', function(err){
			if(!err) {
				console.log('hooray!');

				if (callback) callback(image + '_');

			} else {
				console.log(err);
			}
		});

};

module.exports = Crop;