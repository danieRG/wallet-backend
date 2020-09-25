var nodemailer = require("nodemailer");
var express = require('express');
var app = express();
var config = require('./app/config/dev');
var morgan = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var server = app.listen(8080);
var io = require("socket.io").listen(server);
var socket = require('./app/socket/socket');

var users = require('./app/controllers/users'); 
var login = require('./app/controllers/login');
var requests = require('./app/controllers/requests');
var transactions = require('./app/controllers/transactions');
var db = require('./app/db/db');
var register = require('./app/controllers/register');
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs

	//parse application/json and look for raw text                                        
	app.use(bodyParser.json());                                     
	app.use(bodyParser.urlencoded({extended: true}));               
	app.use(bodyParser.text());                                    
	app.use(bodyParser.json({ type: 'application/json'}));

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	socket.start(io);	
	
	app.post("/send-email", (req, res) =>{
		var transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			post: 587,
			secure: false,
			auth:{
				user:"myah.little@ethereal.email",
				pass:"TCJEj2fChc9kFFN1Wd"
			}
		});

		var mailOptions = {
			form: "remitente",
			to:"danitest92R@gmail.com",
			subject: "Enviado nodemail",
			text: "Correo de prueba"
		}
		transporter.sendMail(mailOptions, (error, info)=>{
			if(error){
				res.status(500).send(error.message);
			}else{
				console.log("Mensaje enviado");
				res.status(200).json(req.body);
			}
		})
	});

	app.route('/register')
		.post(register.addUser);

	app.route('/login')
		.post(login.loginUser);

	app.route('/users/:id/wallet')
		.get(users.getWalletByUserId);

	app.route('/requests')
		.post(requests.addRequest)
		.get(requests.getRequests);

	app.route('/requests/user/:id_requester')
		.get(requests.getRequestByIdUser);

	app.route('/requests/admin/:id_admin_request')
		.post(requests.processRequest);		

	app.route('/transactions/user/:id_user')
		.get(transactions.getTransactionsByIdUser);

	app.route('/transactions/user/:id_user/retire')
		.get(transactions.getRetireByIdUser);				

	console.log("Listening on port " + 8080);

	module.exports = {
		app: app,
		io: io
	}; 