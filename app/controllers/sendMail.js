var nodemailer = require("nodemailer");
module.exports = {

	sendMail: function(req, res){
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
			to:"ruizg92@gmail.com",
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
	}
}