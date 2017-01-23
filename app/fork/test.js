'use strict';

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(new Buffer(process.argv[2], 'base64').toString('utf8'));
} else {
	data = {};
}

console.log(process.cwd());

process.send({
	status : 0,
	html : 'ok',
	tg : {
		log : process.cwd(),
	},
});