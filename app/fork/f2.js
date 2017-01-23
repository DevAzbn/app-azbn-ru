'use strict';

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(new Buffer(process.argv[2], 'base64').toString('utf8'));
} else {
	data = {};
}

console.log('fork f2 test: ' + JSON.stringify(data));

process.send({uid : 'f2', status : 0, html : 'ok', data : data});