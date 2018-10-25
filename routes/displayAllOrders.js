//displayAllOrders.js

const db = require('./dbConnection.js');
const Purchase = db.getModels().purchaseModel;
const Show = db.getModels().showModel;
const Customer = db.getModels().customerModel;

module.exports = 
	(req , res , next) => {
		let customer_id = req.cookies.customerID;

		//get all cart items for current customer
		Purchase.find({})
		.populate({path: 'show', model: Show})
		.populate({path: 'customer', model: Customer})
		.exec((err, items) => {
			if(err) console.log('Error: ' + err);


			let results = items.map( (item) => {
				return { 
					name: item.customer.firstName + 
						' ' + item.customer.lastName,
					id: item._id,
					numberOfTickets: item.numberOfTickets,
					artist: item.show.artist,
					price: item.numberOfTickets * item.show.price,
					date: item.datePurchased
				}
			});

			res.render('allOrders', 
  						{title:'All Past Orders', data: results, admin: req.cookies.admin});

		});
};