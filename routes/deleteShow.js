//deleteShow.js

const db = require('./dbConnection.js');
const Show = db.getModels().showModel;

module.exports = 
	function deleteShow(req, res, next){
		let id = req.params.id;

		let query = Show.findById(id);
		Show.update(query, {active: false},  (err, show) => {
			if(err) console.log('Error: ' + err);

			res.redirect('/shows');
		});

	};