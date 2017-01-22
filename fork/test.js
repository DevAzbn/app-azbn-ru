'use strict';

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(process.argv[2]);
} else {
	data = {};
}

console.log('fork test');

process.send({status : 0, html : 'ok'});