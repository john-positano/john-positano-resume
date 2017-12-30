let express = require('express');
let app = express();

app.get('/', (req, res, next) => { res.send('hi'); });

app.listen(10101);
