var mysql = require('mysql');

var config = {
	db: {
		host: '192.168.1.99', 	// database host
		user: 'root', 		// your database username
		password: "", 		// your database password
		port: 3306, 		// default MySQL port
		db: 'bk_4bees', 		// your database name
		charset: 'utf8_general_ci' // charset
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	},
	wcsettings: {
		url: "http://13.232.209.16/",
   		consumerKey: "ck_c06b3262f65228af47f0b83af9b5ed0c83341f5c",
   		consumerSecret: "cs_0b9299cc200ed833fa85d4cf2b4095abc3b705b0",
   		version: "wc/v3"
	}
}

module.exports = config;