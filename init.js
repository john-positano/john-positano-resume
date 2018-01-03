let express = require('express');
let app = express();
let compression = require('compression');
let serveStatic = require('serve-static');
let stream = require('stream');

let uglify = require('./modules/uglify.js');

app.use(
	'*.js',
	(req, res, next) => {
		console.log(req.originalUrl);
		next();
	}
);

app.use(
	'/',
	[
		compression({
			threshold: 0,
			level: 9
		}),
		express.static('public'),
		express.static('node_modules')
	]
);

app.get('/', (req, res, next) => { res.send('hi'); });

app.listen(process.env.PORT || 3000);
