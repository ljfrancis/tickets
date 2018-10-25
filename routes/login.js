//login.js

const db = require('./dbConnection.js');
const Customer = db.getModels().customerModel;
const User = db.getModels().userModel;

module.exports = 
	function logIn(req, res, next){
		//get show data from form
		let email = req.body.email;
		let password = req.body.password;

		//set cookie for admin status and customer id
		User.findOne({email: email})
		.populate({path: 'customer', model: Customer})
		.exec((err, user) => {
			if (!user || password != user.password) res.render('invalidUser', {login: true});
			else {
				if(req.cookies.admin !=null){
					res.clearCookie('admin');
				} 
				if(req.cookies.customerID !=null){ 
					res.clearCookie('customerID');
				}
				if(user.admin){
					res.cookie('admin' , user.admin, {expire : new Date() + 3600})};
				if (user.customer) {
					res.cookie('customerID', user.customer._id, {expire : new Date() + 3600});
				}
				res.redirect('/shows');
			};
		});

	};