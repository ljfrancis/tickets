//displayShows.js

const db = require('./dbConnection.js');
const Show = db.getModels().showModel;

module.exports = 
	(req, res, next) => {
		let cookies = req.cookies;
		Show.find({active: true}, (err, shows) => {
			if(err) console.log('Error : ' + err);

			let results = shows.map( (show) => {
				return {
					id: show._id,
					artist: show.artist,
					price: show.price,
					date: show.date,
					seats: show.seats,
					admin: cookies.admin
				}
			});
			res.render('displayShows',
				{title: 'Upcoming Shows', data: results, admin: cookies.admin});
	});
}; 