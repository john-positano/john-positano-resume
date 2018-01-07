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

app.use(
	['/1','/2','/3','/4','/5','/6'], 
	function (req, res, next) { 
		res.redirect('/');
		return;
	}
);

app.listen(process.env.PORT || 3000);
