//index.js

const express = require('express');
const router = express.Router();

const loginForm = require('./loginForm');
const login = require('./login');
const logout = require('./logout');
const displayShows = require('./displayShows');
const addShow = require('./addShow');
const saveShow = require('./saveShow');
const deleteShow = require('./deleteShow');
const displayCustomers = require('./displayCustomers');
const buyTickets = require('./buyTickets');
const addToCart = require('./addToCart');
const cart = require('./cart');
const deleteItem = require('./deleteItem');
const checkout = require('./checkout');
const orderHistory = require('./orderHistory');
const displayAllOrders = require('./displayAllOrders');


router.get('/', (req, res, next) => {
	res.redirect('/login');
});

router.get('/login', loginForm);
router.post('/login', login);

router.get('/logout', logout);

router.get('/shows', displayShows);

router.get('/shows/add', addShow);
router.post('/shows/add', saveShow);

router.get('/shows/delete/:id', deleteShow);

router.get('/shows/:id', buyTickets);
router.post('/addToCart', addToCart);

router.get('/cart', cart);
router.get('/cart/delete/:id', deleteItem);

router.get('/customers', displayCustomers);

router.get('/customer/:id', orderHistory);

router.get('/checkout', checkout);

router.get('/orderHistory', orderHistory);

router.get('/displayAllOrders', displayAllOrders);


//REST API
const db = require('./dbConnection.js');
const Purchase = db.getModels().purchaseModel;
const Show = db.getModels().showModel;
const Customer = db.getModels().customerModel;
const User = db.getModels().userModel;
const CartItem = db.getModels().cartItemModel;

//return one customer's purchases
router.get('/customerapi/:id', (req, res) => {

	let customer_id = req.params.id;

		//get all cart items for selected customer
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

			//format output
			res.format({

			//JSON 
			'application/json': () => {
				res.json(results);
			}

		});
	});
});


//return one customer's purchases
router.get('/allCustomersapi', (req, res) => {

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

			//format output
			res.format({

			//JSON 
			'application/json': () => {
				res.json(results);
			}
		});
	});
});


//return active shows 
router.get('/activeShowsapi', (req, res) => {

	Show.find({active: true}, (err, shows) => {
			if(err) console.log('Error : ' + err);

			let results = shows.map( (show) => {
				return {
					id: show._id,
					artist: show.artist,
					price: show.price,
					date: show.date,
					seats: show.seats,
				}
			});

		//format output
			res.format({

			//JSON 
			'application/json': () => {
				res.json(results);
			}
		});
	});
});


//return deleted/sold out shows
router.get('/inactiveShowsapi', (req, res) => {

	Show.find({active: false}, (err, shows) => {
			if(err) console.log('Error : ' + err);

			let results = shows.map( (show) => {
				return {
					id: show._id,
					artist: show.artist,
					price: show.price,
					date: show.date,
					seats: show.seats,
				}
			});

		//format output
			res.format({

			//JSON 
			'application/json': () => {
				res.json(results);
			}
		});
	});
});


//return shows in price range
router.get('/activeShowsapi/:min/:max', (req, res) => {

	let min = req.params.min;
	let max = req.params.max;

	Show.find({active: true, price: { $gte: min },  price: { $lte: max }}, (err, shows) => {
			if(err) console.log('Error : ' + err);

			let results = shows.map( (show) => {
				return {
					id: show._id,
					artist: show.artist,
					price: show.price,
					date: show.date,
					seats: show.seats,
				}
			});

		//format output
			res.format({

			//JSON 
			'application/json': () => {
				res.json(results);
			}
		});
	});
});




module.exports = router;