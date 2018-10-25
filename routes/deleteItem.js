//deleteItem.js

const db = require('./dbConnection.js');
const CartItem = db.getModels().cartItemModel;

module.exports = 
	(req, res, next) => {
		let id = req.params.id;

		CartItem.findById(id, (err, item) => {
			if(err) console.log('Error: ' + err);
			//can't find employee
			if(!item) return res.render('404');
			//delete employee

			item.remove( (err) => {
				if(err) console.log('Error: ' + err);
				res.redirect('/cart');
			});
		});
	};