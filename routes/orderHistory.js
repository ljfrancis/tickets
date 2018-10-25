//orderHistory.js

const db = require('./dbConnection.js');
const Purchase = db.getModels().purchaseModel;
const Show = db.getModels().showModel;
const Customer = db.getModels().customerModel;

module.exports = 
	(req , res , next) => {

		let customer_id = 0;

		if(req.params.id != null) {
			customer_id = req.params.id;
		} else {
			customer_id = req.cookies.customerID;
		}

		//get all cart items for current customer
		Purchase.find({customer: customer_id})
		.populate({path: 'show', model: Show})
		.populate({path: 'customer', model: Customer})
		.exec((err, items) => {
			if(err) console.log('Error: ' + err);

			let results = items.map( (item) => {
				return { 
					id: item._id,
					numberOfTickets: item.numberOfTickets,
					artist: item.show.artist,
					price: item.numberOfTickets * item.show.price,
					date: item.datePurchased
				}
			});


			//get customer name
			Customer.findById(customer_id, (err, customer) =>{
				let name = customer.firstName + ' ' + customer.lastName;

				res.render('orderHistory', 
  						{title:'Order History', data: results, name: name, admin: req.cookies.admin});

		});
	});
};