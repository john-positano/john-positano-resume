let uglify = require('uglify-js');
let fs = require('fs');
let debug = true;
let log = debug ? console.log : function () {};

const dir = __dirname;
const TARGETPATH = `${dir}/../node_modules`;

// var theBigRegistry = [];

// let registerDirectory = (path) => {
// 	var $pathList = fs.readdirSync(path);
// 	log(path);
// 	for (var item of $pathList) {
// 		var $itemPath = `${path}/${item}`;
// 		var $isDirectory = fs.statSync($itemPath).isDirectory();
// 		log(`path: ${$itemPath}, isDirectory: ${$isDirectory}`);
// 		if ($isDirectory) { registerDirectory($itemPath); }
// 		else {
// 			var $isJavaScript = $itemPath.match(/.\.js$/);
// 			!$isJavaScript || theBigRegistry.push($itemPath);	
// 		}
// 	}
// };

// registerDirectory(TARGETPATH);

var theBigRegistry = [
	`${__dirname}/../node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js`
];

for (var file of theBigRegistry) {
	log(`Minifying ${file}`);
	var $a = uglify.minify(fs.readFileSync(file));
	// fs.writeFileSync(file, uglify.minify(fs.readFileSync(file)).code);
	console.log($a);
}

process.exit();