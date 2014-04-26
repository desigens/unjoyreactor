var gm = require('gm');

var imageMagick = gm.subClass({ imageMagick: true });

var image = process.argv[2] || 'image.gif';

imageMagick(image)
	.coalesce()
	.repage(0,0)
	.crop('100%', '100%', 0, -14)
	.repage('+')
	// .resize(200)
	.write(image.split('.')[0] + '1.' + image.split('.')[1], function(err){
		if(!err) {
			console.log('hooray!');
		} else {
			console.log(err);
		}
	});