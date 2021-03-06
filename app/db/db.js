var mysql = require('mysql');
var config = require('../config/dev');
var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.pass,
  database : config.database.dbname,
  port: config.database.port
});

	connection.connect(function(err){
		if(!err) {
		    console.log("Database is connected ...");    
		} else {
		    console.log("Error connecting database ... " + err);    
		}
	});

module.exports = connection;