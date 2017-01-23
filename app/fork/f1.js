'use strict';

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(new Buffer(process.argv[2], 'base64').toString('utf8'));
} else {
	data = {};
}

console.log('fork f1 test');

process.send({uid : 'f1', status : 0, html : 'ok'});