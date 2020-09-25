/**
 * @api {post} /login Sending credentials of user for login
 * @apiName PostUser
 * @apiGroup Login
 *
 * @apiParam {String} username Username or nickname for access of website.
 * @apiParam {String} password Field for secure and unique access users
 * 
 * @apiSuccess {Integer} id Id unique of user.
 * @apiSuccess {String} username nickname of user.
 * @apiSuccess {Integer} is_admin 0 for not admin & 1 for admin.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "user": { "id": 1, "username": "johndoe", "is_admin": 0 } 
 *     }
 *
 * @apiError ObjectUserEmpty user not exist, return a object empty.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "user": ""
 *     }
 */

var connection = require('../db/db');
var sha1 = require('sha1');

module.exports = {

	loginUser: function(req, res){
		connection.query('SELECT users.id,users.username,users.is_admin, user_details.name, user_details.email, user_details.phone, user_details.documento FROM users INNER JOIN user_details ON users.id = user_details.id_user where users.username = ? AND users.password = ?', [req.body.username, sha1(req.body.password)] ,function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				res.send({'user': rows.length > 0 ? rows[0] : ''});
			}		
		});
	}
}