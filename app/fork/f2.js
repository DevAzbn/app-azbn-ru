'use strict';

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(process.argv[2]);
} else {
	data = {};
}

console.log('fork f2 test');

process.send({uid : 'f2', status : 0, html : 'ok'});