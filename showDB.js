//showDB.js

const db = require('./routes/dbConnection.js');
const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const Customer = db.getModels().customerModel;
const Show = db.getModels().showModel;
const User = db.getModels().userModel;
const Purchase = db.getModels().purchaseModel;
const CartItem = db.getModels().cartItemModel;

var dbUrl = 'mongodb://' + credentials.username + ':'
	+ credentials.password + '@' + credentials.host + ':'
	+ credentials.port + '/' + credentials.database;

var connection = mongoose.createConnection(dbUrl);

//create initial shows
connection.on("open", () => {

	//initialize shows
	var show;

	show = new Show({
		artist: 'Maluma',
		price: 70,
		date: new Date("2018-06-15"),
		seats: 25,
		active: true
	}).save();

	show = new Show({
		artist: 'Beyonce',
		price: 90,
		date: new Date("2018-02-03"),
		seats: 100,
		active: true
	}).save();

	show = new Show({
		artist: 'Justin Timberlake',
		price: 65,
		date: new Date("2018-08-27"),
		seats: 40,
		active: true
	}).save();


	//initialize customers and users
	var customer;
	var user; 

	customer = new Customer({
		_id: new mongoose.Types.ObjectId(),
		firstName: 'Zach',
		lastName: 'Reuss'
	})

	customer.save( () => {
		user = new User({
			email: 'zachreuss@email.com',
			password: 'supersecure',
			admin: false,
			customer: customer._id
		}).save();
	});


	customer2 = new Customer({
		_id: new mongoose.Types.ObjectId(),
		firstName: 'Nate',
		lastName: 'Marshall'
	})

	customer2.save( () => {
		user = new User({
			email: 'naters@email.com',
			password: 'javier4ever',
			admin: false,
			customer: customer2._id
		}).save();


	});


	customer3 = new Customer({
		_id: new mongoose.Types.ObjectId(),
		firstName: 'Danny',
		lastName: 'Jiang'
	})

	customer3.save( () => {
			user = new User({
			email: 'danny@email.com',
			password: 'boston',
			admin: false,
			customer: customer3._id
		}).save();
	});


	user = new User({
		email: 'ljfran@email.com',
		password: 'blanket',
		admin: true,
		customer: null
	});


	user.save(function(err) {
		connection.close();
		if (err) throw err;
		console.log("Success!");
	});
}); 