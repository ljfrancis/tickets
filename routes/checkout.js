//checkout.js

const db = require('./dbConnection.js');
const Show = db.getModels().showModel;
const CartItem = db.getModels().cartItemModel;
const Purchase = db.getModels().purchaseModel;

module.exports = 
	(req, res, next) => {
		//get cart item data
		let customer_id = req.cookies.customerID;

		//get all cart items for current customer
		CartItem.find({customer: customer_id})
		.populate({path: 'show', model: Show})
		.exec((err, items) => {
			items.forEach( (item) => {
				if(err) console.log('Error: ' + err);

				let now = new Date();

				//add cart items to purchase table
				let purchase = new Purchase({
					show: item.show,
					customer: item.customer,
					numberOfTickets: item.numberOfTickets,
					datePurchased: now
				});

				purchase.save((error) =>{
					if(error) console.log("Error: " + err );
				});

				//delete item from cart
				item.remove( (err) => {
					if(err) console.log('Error: ' + err);
				});



				let query = Show.findById(item.show._id);
				let newSeats = item.show.seats - item.numberOfTickets;
				let update = {};

				if (newSeats <= 0) {
					update = {seats : 0, active: false};
				} else {
					update = {seats : newSeats};
				}
				
				//edit available seats of show
				Show.update(query, update, (err, show) => {
					if(err) console.log('Error: ' + err);
				});

			});

			res.redirect('/orderHistory');

		});
};