/**
 * @api {post} /register create a new user
 * @apiName addUser
 * @apiGroup UserRegister
 *
 * @apiParam {Integer} id identification of user.
 * 
 * @apiSuccess {Integer} id Id unique of wallet.
 * @apiSuccess {Integer} id_user id of parent wallet.
 * @apiSuccess {Double} money quantity available of money user.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "wallet": { "id": 1, "id_user": 1, "money": 100000 } 
 *     }
 *
 * @apiError ObjectWalletEmpty wallet for user empty, return a object empty.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "wallet": null
 *     }
 */

 
var connection = require('../db/db');
var app = require('../../server');
var client = require('socket.io-client');
var sha1 = require('sha1');

var User = module.exports = {
	addUser: function(req, res){
        connection.query(
			'INSERT INTO users (username,password,is_admin) VALUES (?, ?, ?)', 
			[req.body.username, sha1(req.body.password) ,0],
			function(err, resul_req, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
                    if(req.body.name != null && req.body.email != null && req.body.phone != null && req.body.documento != null){
                        connection.query(
                        'INSERT INTO user_details (name,email,phone,id_user,documento) VALUES (?, ?, ?, ?, ?)', 
                        [req.body.name, req.body.email, req.body.phone, resul_req.insertId,  req.body.documento],
                        function(err, result_transac, fields){
                            if(err != null){
                                console.log(err);
                                connection.end();
                            }else{
                                console.log('Datos agregados correctamente');
                            }		
                        });
                        
                    }
                    connection.query(
                        'INSERT INTO wallet (id_user,money) VALUES (?, ?)', 
                        [ resul_req.insertId, 0],
                        function(err, result_transac, fields){
                            if(err != null){
                                console.log(err);
                                connection.end();
                            }else{
                                console.log('Datos agregados correctamente');
                            }		
                        });
					if(req.body.username != null){ 
                        res.json({'requests': "id_user: "+ resul_req.insertId}); 
                       
					}	 
                    console.log(resul_req);
                    console.log('Datos agregados correctamente');
				}		
		});
		
	}
}