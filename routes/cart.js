//cart.js

const db = require('./dbConnection.js');
const CartItem = db.getModels().cartItemModel;
const Show = db.getModels().showModel;

module.exports = 
	(req , res , next) => {
		let customer_id = req.cookies.customerID;

		//get all cart items for current customer
		CartItem.find({customer: customer_id})
		.populate({path: 'show', model: Show})
		.exec((err, items) => {
			if(err) console.log('Error: ' + err);

			let results = items.map( (item) => {
				return {
					id: item._id,
					numberOfTickets: item.numberOfTickets,
					artist: item.show.artist,
					price: item.numberOfTickets * item.show.price
				}
			});

			res.render('viewCart', 
  						{title:'Cart', data: results, admin: req.cookies.admin});

		});
};