//addToCart.js

const db = require('./dbConnection.js');
const Show = db.getModels().showModel;
const CartItem = db.getModels().cartItemModel;
const Customer = db.getModels().customerModel;

module.exports = 
	(req, res, next) => {
		//get cart item data
		let customer_id = req.cookies.customerID;
		let show_id = req.body.show_id;
		let quantity = req.body.quantity;


		Show.findById(show_id, (error, show) => {
			Customer.findById(customer_id, (error, customer) =>{
				let cart = new CartItem({
					show: show._id,
					customer: customer._id,
					numberOfTickets: quantity
				});

				cart.save((error) =>{
					if(error) console.log("Error: " + err );
					res.redirect('/cart');
				});
			});
		});

	};