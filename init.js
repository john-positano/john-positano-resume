require('dotenv').config();
let express = require('express');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let serveStatic = require('serve-static');
let stream = require('stream');
let spdy = require('spdy');
let http = require('http');

let GeneralPurposeMySQLConnection = require('./modules/GeneralPurposeMySQLConnection');
let C = new GeneralPurposeMySQLConnection();
let uglify = require('./modules/uglify.js');

var TwilioApi = require('./twilioApi/init.js');
var KeyAPI = require('./keyApi/init.js');
var $port = (process.env.PORT || 8080);
var $httpsPort = (process.env.HTTPS_PORT || 8443);

app.post(
	'/ipLog',
	[
		bodyParser.json(),
		(req, res, next) => {
			var ip = res.locals.ip = req.headers['cf-connecting-ip'] || req.ip;
			if (!req.body.latitude || !req.body.longitude) {
				res.status(400);
				return;
			}
			C.pool.query(
				`
					INSERT INTO ipLog (
						ipAddress,
						latitude,
						longitude
					) VALUES (?,?,?)
				`,
				[
					ip,
					req.body.latitude,
					req.body.longitude
				],
				(err, rows, fields) => {
					if (err) { console.error('ipLogErr', err); }
				}
			);
			res.status(200).json({});
			return;
		}
	]
);

// app.use('/twilio', TwilioApi);
app.use('/keyAPI', KeyAPI);

app.use(
	'/',
	[
		compression({
			threshold: 0,
			level: 9
		}),
		express.static('public'),
		express.static('node_modules'),
		express.static('modules')
	]
);

app.use(
	[
		'/1','/2','/3','/4','/5','/6',
		'/webDevelopment'
	],
	express.static('public/index.html')
);

console.log('Date: ' + Date());

var _server = app.listen($port, function () {
	console.log(`Listening on port ${$port}`);
});

C.pool.query(
	`
		SELECT
			(SELECT _value FROM john_positano_resume_certs WHERE _key = 'certificate') AS 'certificate',
			(SELECT _value FROM john_positano_resume_certs WHERE _key = 'key') AS 'key'

	`,
	(err, rows, fields) => {
		if (err) { console.error('DB Connection Error', err); }

		var serverOptions = {
			key: rows[0].key,
			cert: rows[0].certificate
		};

		var server = spdy.createServer(serverOptions, app);

		server.listen($httpsPort, function () {
			console.log(`HTTPS Listening on port ${$httpsPort}`);
		});
	}
);
