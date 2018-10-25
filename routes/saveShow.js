//saveShow.js

const db = require('./dbConnection.js');
const Show = db.getModels().showModel;

module.exports = 
	function saveShow(req, res, next){
		//get show data from form
		let show = new Show({
			artist: req.body.artist,
			price: parseFloat(req.body.price),
			date: new Date(req.body.date),
			seats: parseFloat(req.body.seats),
			active: true
		});

		//save new show
		show.save((err) => {
			if(err) console.log("Error: " + err );
			res.redirect('/shows');
		})
	};