#!/usr/bin/nodejs

const http = require('http');
const fs = require('fs');


function send_error(req, res, error) {
	let template = "", cotent = "", match = 0;
	let send_response = () => { 
		let text = template.replace('{%body%}', content).replace('{%title%}', 'Error ' + error);
		res.statusCode = error;
		res.write(text);
		res.end();
	};
	if (error === 403) {
	} else if (error === 404) {
		fs.readFile('src/templates/error.html', 'UTF-8', (error, cont) => {
			template = cont;
			if (++match === 2) return send_response();
		});
		fs.readFile('src/templates/404.html', 'UTF-8', (error, cont) => {
			content = cont;
			if (++match === 2) return send_response();
		});
	}

}



function server(req, res) {
	if (req.method === 'GET') {
		let file = "bin"
		console.log(req.url);
		if (req.url === '/') file += '/index.html'; 
		else file += req.url;
		if (fs.existsSync(file)) {
			let codec = (['js', 'css', 'html', 'txt'].indexOf(file.split('.').slice(-1)[0]) > -1) ? 'UTF-8' : null;
			fs.readFile(file, codec, (error, content) => {
				res.write(content);
				res.end();
			});
		} else return send_error(req, res, 404);
	} else if (req.method === 'POST')
		return send_error(req, res, 403);
}


http.createServer(server).listen(8080);
