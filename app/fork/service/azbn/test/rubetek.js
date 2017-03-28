'use strict';

//process.chdir(process.cwd());

//var async = require('async');

var azbn = require('./../../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//vk : true,
				//async : true,
				//tg : true,
				webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


//azbn.mdl('fork').killMe(process);

var formData = {
	
	'profile[firstName]' : 'тест',
	'profile[lastName]' : 'test',
	'profile[phone]' : '111-111-11-11',
	'profile[email]' : azbn.now() + '@test.ru',
	'profile[country]' : 'Россия',
	'profile[city]' : 'Орловская, г Орел',
	'profile[delivery_option]' : 'delivery',
	'profile[street]' : 'ул.Какая-то',
	'profile[house]' : '12',
	'profile[room]' : '23',
	'profile[payment_way]' : 'visa',
	'profile[city_code]' : '57000001000',
	'profile[city_id]' : '195945648',
	'profile[promocode]' : '',
	'profile[setup]' : '1',
	
	'sum[deliv_sum]' : '12345',
	
	'cart[7][0][amount]' : '1',
	'cart[7][0][cost]' : '1350',
	
};

azbn.mdl('webclient').r('POST', 'http://rub.dorohovdesign.ru/customtpl/createorder/', formData, function(error, response, body){
	
	if(error) {
		console.log('data', formData);
		console.log('error', error);
		console.log('response', response);
	} else {
		//console.log('data', formData);
		console.log(body);
	}
	
	azbn.mdl('fork').killMe(process);
	
})


process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});

/*
process.on('message', function(msg) {
	console.log(msg);
});
*/