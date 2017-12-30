let express = require('express');
let app = express();
let compression = require('compression');

app.use(compression());

app.use(
	'/', 
	[
		express.static('public'),
		express.static('node_modules')
	]
);

app.get('/', (req, res, next) => { res.send('hi'); });

app.listen(process.env.PORT || 3000);
