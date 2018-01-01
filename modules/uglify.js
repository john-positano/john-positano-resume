let nodeSass = require('node-sass');
let fs = require('fs');

const dir = __dirname,
	targetDir = `${dir}/../public/styles`;

fs.readdirSync(targetDir).filter(stylesheet => stylesheet.match(/scss$/)).forEach(
	(each) => {
		var $targetFile = `${targetDir}/${each}`;

		fs.writeFileSync(
			$targetFile.split('.scss').join('.css'),
			nodeSass.renderSync({ data: fs.readFileSync($targetFile).toString() }).css
		);
	}
);