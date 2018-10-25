//displayCustomers.js

const db = require('./dbConnection.js');
const mongoose = require('mongoose');
const Customer = db.getModels().customerModel;
const User = db.getModels().userModel;

module.exports = 
	(req, res, next) => {

		User.find({customer : {$ne:null}})
		.populate({path: 'customer', model: Customer})
		.exec((err, users) => {
			if(err) console.log('Error : ' + err);
			let results = users.map( (user) => {
				return {
					id: user.customer._id,
					name: user.customer.firstName + ' ' + user.customer.lastName,
					email: user.email	
					}
				});
				res.render('displayCustomers',
				{title: 'Customer List', data: results, admin: req.cookies.admin});
		});
};