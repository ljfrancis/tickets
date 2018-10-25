//buyTickets.js

const db = require('./dbConnection.js');
const Show = db.getModels().showModel;

module.exports = 
	(req , res , next) => {
		let id = req.params.id;
		Show.findById(id, (err, show) => {
			if(err) console.log('Error: ' + err);

			let results = {
				id: show._id,
				artist: show.artist,
				date: show.date, 
				price: show.price,
				seats: show.seats
			};

			res.render('buyTickets', 
  						{title:'Buy Tickets', show: results, admin: req.cookies.admin});

		});
};