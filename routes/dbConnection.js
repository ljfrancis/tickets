//dbConnection.js

var mongoose = require('mongoose');
var credentials = require("../credentials.js");

//connect to database
var dbUrl = 'mongodb://' + credentials.username + ':'
	+ credentials.password + '@' + credentials.host + ':'
	+ credentials.port + '/' + credentials.database;

var connection = null;
var model = null;


const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


//show schema
const showSchema = new Schema({
	artist: String,
	price: Number,
	date: Date,
	seats: Number,
	active: Boolean
});


//customer schema
const customerSchema = new Schema({
	firstName: String,
	lastName: String
});

//purchase Schema
const purchaseSchema = new Schema({
	customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
	show: { type: Schema.Types.ObjectId, ref: 'Show' },
	numberOfTickets: Number,
	datePurchased : Date
});

//cart item Schema
const cartItemSchema = new Schema({
	customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
	show: { type: Schema.Types.ObjectId, ref: 'Show' },
	numberOfTickets : Number
});


//user schema
const userSchema = new Schema({
	email: String,
	password: String,
	admin: Boolean,
	customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
});


module.exports = {
	getModels: function getModels(connection) {
		if (connection == null) {
			connection = mongoose.createConnection(dbUrl);
			models = {showModel: connection.model("showModel", showSchema),
					  customerModel: connection.model("customerModel", customerSchema),
					  userModel: connection.model("userModel", userSchema),
					  purchaseModel: connection.model("purchaseModel", purchaseSchema),
					  cartItemModel: connection.model("cartItemModel", cartItemSchema)}
		};
		return models;
	}
};

