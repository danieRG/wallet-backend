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
			from: "Mi billetera",
			to:req.body.email,
			subject: "Notificacion Mi billetera",
			text: "Correo de confirmación por la operación de "+req.body.operation+" por la cantidad de $"+req.body.quantity+" y tu token de confirmación es: "+req.body.token
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